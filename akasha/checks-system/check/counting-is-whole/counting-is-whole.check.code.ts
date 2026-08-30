import { pageTypesIn } from "../../../pages-system/indexes/index-entries/index-entries.module.code.ts"
import type { Judged, Leaving } from "../../judging/judging.module.code.ts"
import { typeNamedIn } from "../introduced-property-is-a-part/introduced-property-is-a-part.check.code.ts"
import {
  declaredFor,
  readingIn,
} from "../page-matches-its-type/page-matches-its-type.check.code.ts"
import { carriedBy } from "../relation-resolves/relation-resolves.check.code.ts"

const SEQ = "seq"

const NEXT_SEQ = "nextSeq"

export const COUNTS_WITH_NO_COUNT =
  "declares `seq` and states no `next-seq` — a page type whose pages carry a number holds on its own page the number the next one takes"

export const COUNTS_NOTHING =
  "states `next-seq` and declares no `seq` — a count nothing takes from is a number that never moves"

export function countingIsWhole(leaving: Leaving): readonly Judged[] {
  const carried = carriedBy(leaving, pageTypesIn(leaving.root))
  const held = carried.filter((one) => typeNamedIn(one.path) !== null)
  if (held.length === 0) return []
  const read = readingIn(leaving)
  const said: Judged[] = []
  for (const one of held) {
    const slug = typeNamedIn(one.path)
    if (slug === null) continue
    const counts = declaredFor(slug, read).has(SEQ)
    const stated = one.value[NEXT_SEQ] !== undefined
    if (counts && !stated) said.push({ path: one.path, reason: COUNTS_WITH_NO_COUNT })
    if (stated && !counts) said.push({ path: one.path, reason: COUNTS_NOTHING })
  }
  return said
}
