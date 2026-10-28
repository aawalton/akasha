import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  stating,
  telling,
  untaken,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { parsedIn } from "akasha/page/modules/value/page-value.module.code.ts"
import {
  keybinderCaptureOf,
  landedKeybindings,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinder-capture-reading/keybinder-capture-reading.module.code.ts"
import {
  type Held,
  heldOf,
  KEYBINDING_PAGE_TYPE_SLUG,
  KEYBINDING_PAGES,
  type Keybinding,
  keybindingOf,
  keybindingPagePath,
  keybindingPageText,
} from "akasha/temper/addon/shared/temper-keybindings/modules/keybinding-pages/keybinding-pages.module.code.ts"

const CAPTURE = "capture"

const SEEDED_AT = "seeded-at"

const PAGE_ENDING = `.${KEYBINDING_PAGE_TYPE_SLUG}.ts`

const INSTANT = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/

type Page = { readonly path: string; readonly text: string; readonly held: Held }

function heldPagesOf(world: World): {
  readonly keybindings: ReadonlyMap<string, Keybinding>
  readonly pages: ReadonlyMap<string, Page>
} {
  const keybindings = new Map<string, Keybinding>()
  const pages = new Map<string, Page>()
  for (const path of world
    .under(`${KEYBINDING_PAGES}/`)
    .filter((one) => one.endsWith(PAGE_ENDING))) {
    const text = world.textOf(path)
    const value = text === null ? null : parsedIn(text)
    if (text === null || value === null) continue
    const one = keybindingOf(value)
    keybindings.set(one.key, one)
    pages.set(one.key, { path, text, held: heldOf(value) })
  }
  return { keybindings, pages }
}

export function landKeybindingsCommand(world: World, capture: unknown, seededAt: string): Answer {
  const held = heldPagesOf(world)
  const landed = landedKeybindings(keybinderCaptureOf(capture), held.keybindings, seededAt)
  const edits: FileChange[] = []
  let added = 0
  for (const one of landed) {
    const page = held.pages.get(one.key)
    if (page === undefined) {
      edits.push({
        kind: "add",
        path: keybindingPagePath(one.key),
        content: keybindingPageText(one),
      })
      added += 1
      continue
    }
    const content = keybindingPageText(one, page.held)
    edits.push({ kind: "replace", path: page.path, contentFrom: page.text, contentTo: content })
  }
  return telling(stating(edits), [
    `${String(added)} keybinding pages added and ${String(landed.length - added)} written again`,
  ])
}

export const takes: readonly string[] = [CAPTURE, SEEDED_AT]

export function runChange(world: World, given: Readonly<Record<string, string>>): Promise<Answer> {
  const stray = Object.keys(given).find((key) => !takes.includes(key))
  if (stray !== undefined) return Promise.resolve(refusing(untaken(stray, takes)))
  const body = given[CAPTURE]
  if (body === undefined) return Promise.resolve(refusing(missing(CAPTURE)))
  const seededAt = given[SEEDED_AT]
  if (seededAt === undefined) return Promise.resolve(refusing(missing(SEEDED_AT)))
  if (!INSTANT.test(seededAt)) {
    return Promise.resolve(refusing(`\`${seededAt}\` is no instant in UTC to the millisecond`))
  }
  let capture: unknown
  try {
    capture = JSON.parse(body)
  } catch {
    return Promise.resolve(refusing(`the \`${CAPTURE}\` handed in is no JSON`))
  }
  return Promise.resolve(landKeybindingsCommand(world, capture, seededAt))
}
