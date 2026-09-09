import { writeFileSync } from "node:fs"
import { join } from "node:path"
import { removePage } from "@akasha/changes/change-agent/remove-page"
import { type Loaded, loadedAt } from "@akasha/changes/change-loading"
import { editsIn, keptEdits } from "@akasha/changes/edits-keeping"
import { handedPageOf } from "@akasha/changes/subagent-handed"
import { idOf, indexedRepo, NAMER_CODE, NAMER_PAGE, pageOf } from "@akasha/indexes/indexing/testing"
import { pathsOf } from "../../../changes/modules/answer/change-answer.module.code.ts"
import type { FileChange } from "../../../changes/modules/answer/change-answer.module.types.ts"
import type { World } from "../../../changes/modules/shadow/change-shadow.module.code.ts"
import type { Answer } from "../calling/calling.module.code.ts"
import type { Piping } from "../piping/piping.module.code.ts"
import { type Applying, type Chosen, changing, type Over } from "./change-running.module.code.ts"

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

const DRAFT_AT = "commands/pages/change/draft/change-draft.command.ts"

const DRAFT_COMMAND: Readonly<Record<string, string>> = {
  [DRAFT_AT]: pageOf({
    id: "01a04a4a-0001-7000-8000-00000000000a",
    pageTypeSlug: "command",
    slug: "change-draft",
    definition: "the command a run records what that run cost beside",
    code: "ts",
  }),
}

export const CHOSEN: Chosen = {
  said: "change",
  drafts: null,
  barred: [],
  at: DRAFT_AT,
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

const REMOVE_PAGE_AT = "akasha/changes/remove-page.change-agent.ts"

const OWING_NO_READING: Readonly<Record<string, string>> = {
  [REMOVE_PAGE_AT]: pageOf({
    id: "01a04a4a-0001-7000-8000-000000000006",
    pageTypeSlug: "change-agent",
    slug: "remove-page",
    definition: "a mechanical change an indexed repository carries",
    code: "ts",
    changeKind: "change-mechanical",
  }),
}

const CHANGE_KIND_TYPE_AT = "akasha/change-kind.page-type.ts"

const CHANGE_KIND_AT = "akasha/changes/change-mechanical.change-kind.ts"

const KINDS: Readonly<Record<string, string>> = {
  [CHANGE_KIND_TYPE_AT]: pageOf({
    id: "01a04a4a-0001-7000-8000-000000000008",
    pageTypeSlug: "page-type",
    slug: "change-kind",
    definition: "which sort one change is",
    extends: ["page-type/domain"],
    properties: [],
  }),
  [CHANGE_KIND_AT]: pageOf({
    id: "01a04a4a-0001-7000-8000-000000000009",
    pageTypeSlug: "change-kind",
    slug: "change-mechanical",
    definition: "a change composed by a program",
    runsChecks: false,
    writerOwesReading: false,
    readersOweReading: false,
  }),
}

const ANY_KIND = "akasha/changes/remove-file-of-any-kind.change-mechanical"

const ANY_KIND_CODE = join(
  import.meta.dir,
  "../../../changes/mechanical/file/remove/remove-file-of-any-kind",
  "remove-file-of-any-kind.change-mechanical.code.ts"
)

const REACHING_ANY_KIND: Readonly<Record<string, string>> = {
  [`${ANY_KIND}.ts`]: pageOf({
    id: "01a04a4a-0001-7000-8000-000000000007",
    pageTypeSlug: "change-mechanical",
    slug: "remove-file-of-any-kind",
    definition: "a mechanical change an indexed repository carries",
    code: "ts",
  }),
  [`${ANY_KIND}.code.ts`]: `export { runChange } from "${ANY_KIND_CODE}"\n`,
}

export function repo(): string {
  return indexedRepo({
    ...SPARE,
    ...OWING_NO_READING,
    ...REACHING_ANY_KIND,
    ...KINDS,
    ...DRAFT_COMMAND,
  })
}

export function piping(said: string): Piping {
  return () => ({ bytes: new TextEncoder().encode(said) })
}

export const NOTHING: Piping = () => ({ bytes: new Uint8Array(0) })

export const APPLIED: (string | null)[] = []

export const MEASURED: boolean[] = []

export const applying: Applying = async (message, measure) => {
  APPLIED.push(message)
  MEASURED.push(measure)
  return { report: [`applied ${message ?? "what the apply composes"}`], refusals: [], code: 0 }
}

const refusingApply: Applying = async () => ({
  report: [],
  refusals: ["the checks refused the landing"],
  code: 3,
})

export async function refusedApply(root: string, at: string): Promise<Answer> {
  return await changing(
    root,
    PAGE,
    null,
    ["remove-page"],
    piping(taking(at)),
    loading,
    refusingApply,
    CHOSEN
  )
}

export function taking(path: string): string {
  return `at: ${path}\n`
}

export function asking(path: string, message: string): string {
  return `${taking(path)}message: ${message}\n`
}

export async function loading(world: World, at: string): Promise<Loaded | string> {
  if (at === "change-agent/remove-page") return REMOVE_PAGE
  return await loadedAt(world, at)
}

export function pathsIn(root: string): readonly string[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.flatMap(pathsOf)
}

export const SUB = "tester-one"

export function handing(root: string, under: string, rows: readonly FileChange[]): undefined {
  keptEdits(root, handedPageOf(under), () => rows)
}

export const HANDED_AT = "akasha/three/handed.md"

export const HANDED_ONE: FileChange = { kind: "add", path: HANDED_AT, content: "handed" }

export const EDIT: FileChange = { kind: "add", path: "a/b.ts", content: "held" }

export const HELD = { edits: [EDIT], refused: null }

export const NOT_TEXT_AT = "akasha/three/wallpaper.png"

export const NOT_TEXT_SAID = `\`${NOT_TEXT_AT}\` is not text, and a change reads a body as text`

export function readingNotText(root: string): Over {
  writeFileSync(join(root, NOT_TEXT_AT), new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a]))
  return async (world) => ({
    edits: [{ kind: "add", path: NOT_TEXT_AT, content: world.textOf(NOT_TEXT_AT) ?? "" }],
    refused: null,
  })
}

export async function acting(
  root: string,
  argv: readonly string[],
  said: Piping = NOTHING
): Promise<Answer> {
  return await changing(root, PAGE, null, argv, said, loading, applying, CHOSEN)
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
  return said.report.some((one) => one.includes("akasha change apply"))
}

export function owedIn(root: string): readonly (boolean | undefined)[] {
  const said = editsIn(root, PAGE)
  return "why" in said ? [] : said.rows.map((one) => one.readersOweReading)
}

export function drafting(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\n`))
}

export function draftingAndApplying(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\nmessage: a message\n`))
}

export function measuring(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}measure: true\n`))
}

export function measuringWrongly(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}measure: yes\n`))
}

export function draftingAndMeasuring(root: string, at: string): Promise<Answer> {
  return acting(root, ["remove-page"], piping(`${taking(at)}draft: true\nmeasure: true\n`))
}
