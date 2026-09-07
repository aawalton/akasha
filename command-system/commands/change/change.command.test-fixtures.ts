import { idOf, indexedRepo, pageOf } from "@akasha/indexes/indexing/testing"
import { removePage } from "../../../changes/checked/pages/remove-page/remove-page.change-checked.code.ts"
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
import type { Piping } from "../../piping/piping.module.code.ts"
import type { Applying } from "./change.command.code.ts"

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

export const APPLIED: string[] = []

export const applying: Applying = async (message) => {
  APPLIED.push(message)
  return { report: [`applied ${message}`], refusals: [], code: 0 }
}

export function taking(path: string): string {
  return `at: ${path}\n`
}

export function asking(path: string, message: string): string {
  return `${taking(path)}apply: ${message}\n`
}

export async function loading(world: World, at: string): Promise<Loaded | string> {
  if (at === "change-command/remove-page") return REMOVE_PAGE
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
