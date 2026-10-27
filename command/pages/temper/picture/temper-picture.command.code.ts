import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { out as outArgument } from "akasha/command/argument/pages/out.argument.ts"
import { pictureSubject } from "akasha/command/argument/pages/picture-subject.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperPicture as page } from "akasha/command/pages/temper/picture/temper-picture.command.ts"
import {
  gameArt,
  gameTypefaces,
} from "akasha/temper/eso/ui-harness/modules/game-art/game-art.module.code.ts"
import {
  accountCharacters,
  characterAmong,
  type PlayedCharacter,
  playedAsLua,
} from "akasha/temper/eso/ui-harness/modules/played-character/played-character.module.code.ts"
import { takePicture } from "akasha/temper/eso/ui-harness/modules/ui-picture/ui-picture.module.code.ts"
import {
  settled,
  stageUiHarness,
} from "akasha/temper/eso/ui-harness/modules/ui-staging/ui-staging.module.code.ts"
import {
  uiWindowNamed,
  uiWindowSlugs,
  windowsDeclaredIn,
} from "akasha/temper/eso/ui-harness/modules/ui-windows/ui-windows.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const TAKES = [outArgument, pictureSubject, character] as const

function saidOfNoCharacter(root: string, asked: string): string {
  const titles = accountCharacters(root).map((one) => String(one.title ?? one.slug))
  return `\`${asked}\` is no character of the account; the characters are ${namesDrawn(titles)}`
}

function saidOfNoWindow(root: string, asked: string): string {
  const here = namesDrawn(uiWindowSlugs())
  const declared = windowsDeclaredIn(root).find((one) => one.toLowerCase() === asked.toLowerCase())
  if (declared !== undefined) {
    return (
      `\`${declared}\` is declared by an interface document rather than opened by code, and` +
      ` nothing here says what brings that window up, so it is nowhere yet; the windows here` +
      ` are ${here}`
    )
  }
  return `\`${asked}\` is no window here; the windows here are ${here}`
}

export async function temperPicture(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, TAKES)
  if ("refused" in read) return refusedBy(read.refused)
  const taken = read.taken

  const window = uiWindowNamed(taken.pictureSubject)
  if (window === undefined) return refusedBy([saidOfNoWindow(given.root, taken.pictureSubject)])

  let played: PlayedCharacter | null = null
  if (taken.character !== undefined) {
    played = characterAmong(accountCharacters(given.root), taken.character)
    if (played === null) return refusedBy([saidOfNoCharacter(given.root, taken.character)])
  }

  const written = resolve(given.root, taken.out)
  const staged = await stageUiHarness({
    root: given.root,
    addon: window.addon,
    ...(window.alongside === undefined ? {} : { alongside: window.alongside }),
    savedVariables: window.savedVariables,
    shows: window.shows,
    ...(window.stages === undefined ? {} : { stages: window.stages }),
    ...(played === null ? {} : { playsAs: playedAsLua(played) }),
  })
  try {
    await staged.harness.load("return __ui_swallowed_cleared()")
    await staged.harness.load(window.opens)
    await settled(staged.harness)
    const swallowed = String(await staged.harness.load("return __ui_swallowed_said()"))
      .split("\n")
      .filter((one) => one !== "")
    const sceneNamed = String(
      await staged.harness.load(
        "local now = SCENE_MANAGER:GetCurrentScene() return now ~= nil and now:GetName() or ''"
      )
    )
    const hiddenBy = String(
      await staged.harness.load(
        `local at = WINDOW_MANAGER:GetControlByName(${JSON.stringify(window.control)})
        while at ~= nil do
          if at:IsControlHidden() then return at:GetName() end
          at = at:GetParent()
        end
        return ''`
      )
    )
    const snapshot = await staged.harness.snapshot(window.control)
    if (snapshot === null) {
      return refusedBy([
        `\`${window.control}\` is no control the addon made, so there is nothing to picture`,
      ])
    }
    const scene = await staged.harness.snapshot()
    if (scene === null) {
      return refusedBy(["the screen is nowhere, so there is nothing to picture"])
    }
    await mkdir(dirname(written), { recursive: true })
    const art = await gameArt()
    const lacking = new Set<string>()
    const box = await takePicture(scene, written, {
      whole: true,
      screen: { left: 0, top: 0, width: scene.width, height: scene.height },
      textureAt: (texture) => {
        const found = art(texture)
        if (found === null && texture.trim() !== "") lacking.add(texture)
        return found
      },
      fontAt: await gameTypefaces(),
    })
    return told([
      written,
      `${Math.round(box.width)} by ${Math.round(box.height)}, built at ${staged.builtAt}`,
      played === null
        ? "played as the character the player's own game last answered for"
        : `played as ${played.name}, ${played.id}`,
      `the game's interface is up with ${String(staged.refused.length)} of its files refused`,
      staged.live.length === 0
        ? "every add-on file came from its build"
        : `${String(staged.live.length)} add-on file(s) came from the game's addons folder, as the` +
          ` watcher wrote them: ${staged.live.join(", ")}`,
      staged.fromPages.length === 0
        ? "no add-on file was built from the pages"
        : `${String(staged.fromPages.length)} add-on file(s) were built from the pages as they are` +
          ` now, as the watcher builds them: ${staged.fromPages.join(", ")}`,
      `\`${window.control}\` sits at ${Math.round(snapshot.left)}, ${Math.round(snapshot.top)}` +
        ` and is ${Math.round(snapshot.width)} by ${Math.round(snapshot.height)}`,
      hiddenBy === "" ? "it is shown" : `it is hidden, by \`${hiddenBy}\``,
      sceneNamed === "" ? "no scene is up" : `the scene up is \`${sceneNamed}\``,
      lacking.size === 0
        ? "every texture drawn was found"
        : `${String(lacking.size)} texture(s) drawn were found in neither the game nor an add-on:` +
          ` ${[...lacking].sort().join(", ")}`,
      swallowed.length === 0
        ? "opening it raised no Lua error the sandbox ran past"
        : `opening it raised ${String(swallowed.length)} Lua error(s) the sandbox ran past:`,
      ...swallowed,
    ])
  } finally {
    await staged.harness.close()
  }
}
