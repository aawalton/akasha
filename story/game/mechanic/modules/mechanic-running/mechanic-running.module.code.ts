import { statSync } from "node:fs"
import { isAbsolute, join } from "node:path"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const RUN = "runMechanic"
const ANSWERED = "answered"
const REFUSED = "refused"
const CODE = "code"
const TS = "ts"

export type Ran = { readonly answered: unknown } | { readonly refused: string }

export function codeAt(root: string, address: string): string | null {
  const named = addressIn(address)
  if (named.kind !== "qualified") return null
  const listed = listedAt(root, named.pageTypeSlug, named.slug)[0]
  if (listed === undefined) return null
  return besideAt(listed.path, CODE, TS)
}

function freshlyAt(root: string, path: string): string {
  const at = isAbsolute(path) ? path : join(root, path)
  const entry = statSync(at, { throwIfNoEntry: false })
  return entry === undefined ? at : `${at}?${entry.mtimeMs}`
}

function ranIn(given: unknown): Ran {
  if (!isRecord(given)) return { answered: given }
  const refused = given[REFUSED]
  if (typeof refused === "string") return { refused }
  return ANSWERED in given ? { answered: given[ANSWERED] } : { answered: given }
}

export async function ranAt(root: string, address: string, asking: unknown): Promise<Ran> {
  const path = codeAt(root, address)
  if (path === null) return { refused: `\`${address}\` names no mechanic here` }
  const held = (await import(freshlyAt(root, path))) as Record<string, unknown>
  const run = held[RUN]
  if (typeof run !== "function") {
    return { refused: `\`${address}\` reaches no mechanic exporting \`${RUN}\`` }
  }
  return ranIn((run as (given: unknown) => unknown)(asking))
}
