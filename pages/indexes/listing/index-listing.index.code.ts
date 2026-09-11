import { join } from "node:path"
import type { Entry } from "akasha/pages/indexes/entries/index-entries.module.code.ts"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import { pathAt } from "akasha/pages/indexes/path/index-path.index.code.ts"

export const LISTED_UNDER = indexListing.name

export const LISTED_AT = join(LISTED_UNDER, "path.jsonl")

export function listedOf(entries: readonly Entry[]): readonly Entry[] {
  return entries.map((one) => ({ at: LISTED_AT, line: pathAt(one.at) }))
}
