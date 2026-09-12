import { partsOf } from "akasha/checks/code-checks/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const SORTED = "a parts list is sorted by the whole `type/slug` a part is written as"

export function reasonFor(parts: readonly string[]): string | null {
  for (let at = 1; at < parts.length; at += 1) {
    const above = parts[at - 1]
    const one = parts[at]
    if (above === undefined || one === undefined || above <= one) continue
    return `names \`${one}\` after \`${above}\` among its parts — ${SORTED}`
  }
  return null
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const judged: Judged[] = []
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const value = shadow.pageOf(path)
    if (value === null) continue
    const reason = reasonFor(partsOf(value))
    if (reason !== null) judged.push({ path, reason })
  }
  return judged
}
