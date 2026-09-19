import {
  domainsIn,
  type Hung,
  type HungTree,
  hungOnDomains,
} from "akasha/alan/harness/code-editor/data-interface/modules/domain-tree-hanging/domain-tree-hanging.module.code.ts"
import {
  everyValue,
  readingIn,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  recordsIn,
  slugOf,
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"

const DECISIONS = "decisions"

const DECISION_KIND = "decisionKind"

const STATEMENT = "statement"

const GAP = "gap"

const KEYED = "gap/"

const PLACE_MARK = "#"

export type Gapped = {
  readonly at: string
  readonly domain: string
  readonly place: number
  readonly said: string
}

export function gapsOn(path: string, value: Value): readonly Gapped[] {
  const parted = partedIn(path)
  if (parted === null || parted.sections.length > 0) return []
  const domain = `${parted.pageType}/${parted.slug}`
  const found: Gapped[] = []
  for (const one of recordsIn(value[DECISIONS])) {
    const kind = one[DECISION_KIND]
    const said = textAt(one, STATEMENT)
    if (typeof kind !== "string" || slugOf(kind) !== GAP || said === null) continue
    found.push({ at: path, domain, place: found.length + 1, said })
  }
  return found
}

export function gapsIn(given: string | Reading): readonly Gapped[] {
  const found: Gapped[] = []
  for (const [path, value] of everyValue(readingIn(given))) found.push(...gapsOn(path, value))
  return found
}

export function hungOf(gaps: readonly Gapped[]): readonly Hung[] {
  return gaps.map((one) => ({
    key: `${KEYED}${one.domain}${PLACE_MARK}${String(one.place)}`,
    label: one.said,
    at: one.at,
    domain: one.domain,
  }))
}

export function assembleGapTree(given: string | Reading): HungTree {
  const reading = readingIn(given)
  return hungOnDomains(domainsIn(reading), hungOf(gapsIn(reading)))
}
