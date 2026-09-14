import { join } from "node:path"
import { indexListing } from "akasha/pages/indexes/listing/index-listing.index.ts"
import type { Entry } from "akasha/pages/indexes/modules/entries/index-entries.module.code.ts"

export const LISTED_UNDER = indexListing.name

export const LISTED_AT = join(LISTED_UNDER, "path.jsonl")

export function listedOf(paths: readonly string[]): readonly Entry[] {
  return paths.map((one) => ({ at: LISTED_AT, line: one }))
}
