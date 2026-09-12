import {
  edging,
  filing,
  founded,
  pathFor,
  put,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { idFiled } from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

const ABOVE_ID = "01a0959b-4249-7000-a2fe-000000000001"

const BELOW_ID = "01a0959b-4249-7000-a2fe-000000000002"

export const ABOVE_AT = pathFor("domain", "above")

export const BELOW_AT = pathFor("module", "below")

export const SHARED = "A row a write left half appended is passed over."

export const OTHER = "A folder git owns is walked past."

export const scratch = scratchWorld()

function statedAs(said: readonly string[]): string {
  const each = said.map(
    (one) => `{ invariantKind: "departure", statement: ${JSON.stringify(one)} }`
  )
  return `invariants: [${each.join(", ")}]`
}

function texted(id: string, kind: string, slug: string, stated: string): string {
  return (
    `export const held = { id: ${JSON.stringify(id)}, pageTypeSlug: ${JSON.stringify(kind)}, ` +
    `slug: ${JSON.stringify(slug)}, ${stated} }\n`
  )
}

export function aboveText(said: readonly string[]): string {
  return texted(ABOVE_ID, "domain", "above", `parts: ["module/below"], ${statedAs(said)}`)
}

export function belowText(said: readonly string[]): string {
  return texted(BELOW_ID, "module", "below", statedAs(said))
}

export function rooted(above: readonly string[], below: readonly string[]): string {
  const root = scratch.rootFor("akasha-invariant-restated-")
  founded(root)
  typed(root, "domain", "page")
  typed(root, "module", "page")
  filing(root, "domain", "above", ABOVE_ID)
  filing(root, "module", "below", BELOW_ID)
  idFiled(root, ABOVE_ID, [{ path: ABOVE_AT, id: ABOVE_ID }])
  idFiled(root, BELOW_ID, [{ path: BELOW_AT, id: BELOW_ID }])
  edging(root, BELOW_ID, "parts", ABOVE_ID, ABOVE_AT)
  put(root, ABOVE_AT, bytesOf(aboveText(above)))
  put(root, BELOW_AT, bytesOf(belowText(below)))
  return root
}
