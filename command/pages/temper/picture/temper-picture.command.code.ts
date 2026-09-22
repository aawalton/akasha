import { mkdir } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { out as outArgument } from "akasha/command/argument/pages/out.argument.ts"
import { pictureSubject } from "akasha/command/argument/pages/picture-subject.argument.ts"
import { refusedBy, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { temperPicture as page } from "akasha/command/pages/temper/picture/temper-picture.command.ts"
import { takePicture } from "akasha/temper/eso/ui-harness/modules/ui-picture/ui-picture.module.code.ts"
import { stageUiHarness } from "akasha/temper/eso/ui-harness/modules/ui-staging/ui-staging.module.code.ts"
import {
  uiWindowNamed,
  uiWindowSlugs,
  windowsDeclaredIn,
} from "akasha/temper/eso/ui-harness/modules/ui-windows/ui-windows.module.code.ts"
import { namesDrawn } from "akasha/text/writing/modules/name-drawing/name-drawing.module.code.ts"

const TAKES = [outArgument, pictureSubject] as const

function saidOfNoWindow(root: string, asked: string): string {
  const here = namesDrawn(uiWindowSlugs())
  const declared = windowsDeclaredIn(root).find((one) => one.toLowerCase() === asked.toLowerCase())
  if (declared !== undefined) {
    return (
      `\`${declared}\` is declared outright by an interface document, and only the templates a` +
      ` document says are virtual are built here, so that window is nowhere yet; the windows` +
      ` here are ${here}`
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

  const written = resolve(given.root, taken.out)
  const staged = await stageUiHarness({
    root: given.root,
    addon: window.addon,
    savedVariables: window.savedVariables,
  })
  try {
    await staged.harness.load(window.opens)
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
    const box = await takePicture(scene, written, { whole: true })
    return told([
      written,
      `${Math.round(box.width)} by ${Math.round(box.height)}, built at ${staged.builtAt}`,
      `\`${window.control}\` sits at ${Math.round(snapshot.left)}, ${Math.round(snapshot.top)}` +
        ` and is ${Math.round(snapshot.width)} by ${Math.round(snapshot.height)}`,
    ])
  } finally {
    await staged.harness.close()
  }
}
