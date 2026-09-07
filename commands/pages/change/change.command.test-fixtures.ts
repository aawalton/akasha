import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { idOf, indexedRepo, NAMER_CODE, NAMER_PAGE, pageOf } from "@akasha/indexes/indexing/testing"
import { removePage } from "../../../changes/agent/file/remove-page/remove-page.change-checked.code.ts"
import type { Edit } from "../../../changes/modules/change-answer/change-answer.module.types.ts"
import type { World } from "../../../changes/modules/change-shadow/change-shadow.module.code.ts"
import {
  editsIn,
  handedRef,
  putUnder,
} from "../../../changes/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  type Loaded,
  loadedAt,
} from "../../../changes/runners/pages/change-running/change-running.change-runner.code.ts"
import type { Answer } from "../../../command-system/calling/calling.module.code.ts"
import type { Piping } from "../../../command-system/piping/piping.module.code.ts"
import { type Applying, changing, type Over } from "./change.command.code.ts"

export const PAGE = "akasha/seat-system/seats/pages/tester.seat.ts"

export const MISSING = "akasha/one/missing.module.ts"

export const SPARE_PAGE = "akasha/three/spare.module.ts"

export const SPARE_CODE = "akasha/three/spare.module.code.ts"

const SPARE: Readonly<Record<string, string>> = {
  [SPARE_PAGE]: pageOf({
    id: idOf("d"),
    pageTypeSlug: "module",
    slug: "spare",
    definition: "a page importing the page held",
    code: "ts",
  }),
  [SPARE_CODE]: 'import { kept } from "../one/held.module.code.ts"\n\nexport const spare = kept\n',
}

let given: Readonly<Record<string, string>> = {}

export function givenIn(): Readonly<Record<string, string>> {
  return given
}

const REMOVE_PAGE: Loaded = {
  run: (world, said) => {
    given = said as Readonly<Record<string, string>>
    return removePage(world, said as { at: string })
  },
  guards: [],
}

export function repo(): string {
  return indexedRepo(SPARE)
}

export function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}

export const NOTHING: Piping = () => ({ bytes: new Uint8Array(0) })

export const APPLIED: (string | null)[] = []

export const applying: Applying = async (message) => {
  APPLIED.push(message)
  return { report: [`applied ${message ?? "what the apply composes"}`], refusals: [], code: 0 }
}

const refusingApply: Applying = async () => ({
  report: [],
  refusals: ["the checks refused the landing"],
  code: 3,
})

export async function refusedApply(root: string, at: string): Promise<Answer> {
  return await changing(root, PAGE, ["remove-page"], piping(taking(at)), loading, refusingApply)
}

export function taking(path: string): string {
  return `at: ${path}\n`
}

export function asking(path: string, message: string): string {
  return `${taking(path)}apply: ${message}\n`
}

export async function loading(world: World, at: string): Promise<Loaded | string> {
  if (at === "change-checked/remove-page") return REMOVE_PAGE
  return await loadedAt(world, at)
}

export function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.path)
}

export function handing(root: string, under: string, rows: readonly Edit[]): undefined {
  const ref = handedRef(PAGE, under)
  if (ref !== null) putUnder(root, ref, `${rows.map((one) => JSON.stringify(one)).join("\n")}\n`)
}

export const HANDED_ONE: Edit = { path: "akasha/three/handed.md", was: null, body: "handed" }

export const MOVED_FROM = "akasha/three/from.md"

export const MOVED: Edit = { path: "akasha/three/to.md", was: null, body: "to", from: MOVED_FROM }

export const EDIT: Edit = { path: "a/b.ts", was: null, body: "held" }

export const HELD = { edits: [EDIT], refused: null }

export const NOT_TEXT_AT = "akasha/three/wallpaper.png"

export const NOT_TEXT_SAID = `\`${NOT_TEXT_AT}\` is not text, and a change reads a body as text`

export function readingNotText(root: string): Over {
  writeFileSync(join(root, NOT_TEXT_AT), new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]))
  return async (world) => ({
    edits: [{ path: NOT_TEXT_AT, was: null, body: world.textOf(NOT_TEXT_AT) }],
    refused: null,
  })
}

export async function acting(
  root: string,
  argv: readonly string[],
  said: Piping = NOTHING
): Promise<Answer> {
  return await changing(root, PAGE, argv, said, loading, applying)
}

export async function removing(root: string, at: string, message?: string): Promise<Answer> {
  const said = message === undefined ? taking(at) : asking(at, message)
  return await acting(root, ["remove-page"], piping(said))
}

export const BOTH: readonly string[] = [NAMER_CODE, NAMER_PAGE]

export function keptIn(root: string): readonly string[] {
  return [...pathsIn(root)].sort()
}

export function saysApply(said: Answer): boolean {
  return said.report.some((one) => one.includes("akasha apply"))
}

export const DROPPED_BOTH: readonly string[] = [
  ...[`takes ${NAMER_CODE} away`, `takes ${NAMER_PAGE} away`].sort(),
  "these edits are gone, and no apply lands them",
]

export const DROPPED_ONE: readonly string[] = [
  `takes ${NAMER_CODE} away`,
  "these edits are gone, and no apply lands them",
  "1 edit(s) are still kept beside this agent's page",
]

export const HANDED_SAID: readonly string[] = [
  "one handed 1 edit(s) over",
  "two handed 2 edit(s) over",
  "`akasha change take <subagent>` takes one of these into this agent's own",
]

export const NONE_HANDED = "no subagent has handed edits to this agent"

export const WRITES: Edit = { path: "a/b.ts", was: null, body: "held" }

export const WRITTEN = [{ path: "a/b.ts", body: new TextEncoder().encode("held") }]

export const REMOVES: Edit = { path: "a/b.ts", was: "held", body: null }

export const REMOVED = [{ path: "a/b.ts", body: null }]

export const MOVES: Edit = { path: "a/two.ts", was: "held", body: "held", from: "a/one.ts" }

export const MADE_MOVE = [
  { path: "a/one.ts", body: null },
  { path: "a/two.ts", body: new TextEncoder().encode("held") },
]

export function owedIn(root: string): readonly (boolean | undefined)[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.readersOweReading)
}

export function drafting(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\n`))
}

export function draftingAndApplying(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\napply: a message\n`))
}

export const BAD_DROPS: readonly (readonly [readonly string[], Piping | undefined])[] = [
  [["drop", NAMER_CODE], undefined],
  [["drop"], piping(`${NAMER_CODE}\n`)],
  [["drop"], () => ({ unreadable: "went quiet", part: true as const })],
]
