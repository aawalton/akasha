import type { Judged } from "../../../checks-system/judging.module.code.ts"
import type { Whole } from "../../checking.module.code.ts"
import { corpusFor } from "../../checking.module.code.ts"
import { claimsIn } from "../../page-claims.module.code.ts"

const REASON =
  "no page claims this file — a file under `akasha` is a page, named for its slug and its page " +
  "type, or one page property's own file, named for its page and for the property it holds"

export function fileHasItsPage(given: Whole): readonly Judged[] {
  const read = corpusFor(given)
  if (read.kind === "unread") return [{ path: given.root, reason: read.reason }]
  const claimed = new Set<string>()
  for (const page of read.corpus.every()) claimed.add(read.back(page.path))
  for (const claim of claimsIn(read.corpus)) claimed.add(read.back(claim.path))
  const said: Judged[] = []
  for (const path of given.paths) {
    if (claimed.has(path)) continue
    said.push({ path, reason: REASON })
  }
  return said
}
