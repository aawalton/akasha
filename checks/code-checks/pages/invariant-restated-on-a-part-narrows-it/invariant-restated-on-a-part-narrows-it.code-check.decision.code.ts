import {
  namersOf,
  partsOf,
} from "akasha/checks/code-checks/pages/domain-is-named-by-a-parent/domain-is-named-by-a-parent.code-check.decision.code.ts"
import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { pageNamed } from "akasha/pages/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"
import type { Value } from "akasha/pages/value-reading/page-value-reading.module.code.ts"

const INVARIANTS = "invariants"

const STATEMENT = "statement"

const ID = "id"

const PARTED_BY = "/"

const NARROWS =
  "an invariant is restated on a part only to narrow what the page above states, and the same" +
  " words on both leave two pages answering for one statement"

export function statementsIn(value: Value | null): readonly string[] {
  const held = value === null ? null : value[INVARIANTS]
  if (!Array.isArray(held)) return []
  const said: string[] = []
  for (const one of held) {
    if (one === null || typeof one !== "object" || Array.isArray(one)) continue
    const stated = (one as Record<string, unknown>)[STATEMENT]
    if (typeof stated === "string" && stated.trim() !== "") said.push(stated.trim())
  }
  return said
}

function belowOf(shadow: Shadow, value: Value): readonly string[] {
  const found: string[] = []
  for (const one of partsOf(value)) {
    const at = one.indexOf(PARTED_BY)
    if (at < 0) continue
    for (const each of shadow.index.listedAt(one.slice(0, at), one.slice(at + 1))) {
      found.push(each.path)
    }
  }
  return found
}

function aboveOf(shadow: Shadow, value: Value): readonly string[] {
  const id = value[ID]
  if (typeof id !== "string") return []
  const found: string[] = []
  for (const one of namersOf(shadow, id)) {
    const listed = shadow.index.listedById(one)
    if (listed !== null) found.push(listed.path)
  }
  return found
}

function pairsFor(shadow: Shadow, path: string, value: Value): readonly string[][] {
  const found: string[][] = []
  for (const one of belowOf(shadow, value)) if (one !== path) found.push([path, one])
  for (const one of aboveOf(shadow, value)) if (one !== path) found.push([one, path])
  return found
}

export function sharedIn(above: readonly string[], below: readonly string[]): readonly string[] {
  const held = new Set(above)
  return below.filter((one) => held.has(one))
}

export function reasonFor(above: string, said: string): string {
  return `states \`${said}\`, which ${above} states word for word — ${NARROWS}`
}

export function refusalsOver(change: Change, shadow: Shadow): readonly Judged[] {
  const pageTypes = shadow.index.pageTypesIn()
  const judged: Judged[] = []
  const walked = new Set<string>()
  for (const path of change.changed) {
    if (!pageNamed(path, pageTypes)) continue
    const value = shadow.pageOf(path)
    if (value === null) continue
    for (const pair of pairsFor(shadow, path, value)) {
      const above = pair[0] ?? ""
      const below = pair[1] ?? ""
      const key = `${above} ${below}`
      if (walked.has(key)) continue
      walked.add(key)
      const shared = sharedIn(
        statementsIn(shadow.pageOf(above)),
        statementsIn(shadow.pageOf(below))
      )
      for (const one of shared) judged.push({ path: below, reason: reasonFor(above, one) })
    }
  }
  return judged
}
