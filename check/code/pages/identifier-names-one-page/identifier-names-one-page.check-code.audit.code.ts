import {
  refusalsOf,
  statedBy,
} from "akasha/check/code/pages/identifier-names-one-page/identifier-names-one-page.check-code.decision.code.ts"
import type { Carried } from "akasha/check/code/pages/relation-resolves/relation-resolves.check-code.decision.code.ts"
import {
  type Commit,
  commitIn,
} from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { identifyingFrom } from "akasha/page/type/modules/declared-properties/declared-properties.module.code.ts"

function carriedIn(commit: Commit): readonly Carried[] {
  const pageTypes = commit.index.pageTypesIn()
  const found: Carried[] = []
  for (const path of commit.paths) {
    if (!pageNamed(path, pageTypes)) continue
    const value = commit.pageOf(path)
    if (value !== null) found.push({ path, value })
  }
  return found
}

export function identifierNamesOnePage(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const stated = statedBy(carriedIn(commit), identifyingFrom(commit.index.sourceIn()))
  return refusalsOf(stated, commit.index.listedNamed)
}
