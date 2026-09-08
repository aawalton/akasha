import { join } from "node:path"
import type { Entry } from "../entries/index-entries.module.code.ts"
import { pathAt } from "../path/index-path.index.code.ts"
import { indexListing } from "./index-listing.index.ts"

export const LISTED_UNDER = indexListing.name

export const LISTED_AT = join(LISTED_UNDER, "path.jsonl")

export function listedOf(entries: readonly Entry[]): readonly Entry[] {
  return entries.map((one) => ({ at: LISTED_AT, line: pathAt(one.at) }))
}
