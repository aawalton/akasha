import { textsOf } from "akasha/command/pages/watching/hallmark/modules/hallmark-misfiling/hallmark-misfiling.module.code.ts"
import type {
  Entry,
  Series,
} from "akasha/command/pages/watching/hallmark/modules/hallmark-series/hallmark-series.module.code.ts"
import type { Row } from "akasha/page/service/modules/page-asking/page-asking.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"

const LAST_DAY = "9999-12-31"

const FIRST = 1

function datedOf(entry: Entry): string {
  return entry.listed?.aired ?? entry.titled?.publishedAt ?? LAST_DAY
}

export function positionsOf(series: ReadonlyMap<string, Series>): ReadonlyMap<Entry, number> {
  const positions = new Map<Entry, number>()
  for (const held of series.values()) {
    const sorted = [...held.entries].sort((one, other) =>
      datedOf(one).localeCompare(datedOf(other))
    )
    sorted.forEach((one, at) => positions.set(one, at + FIRST))
  }
  return positions
}

export function placed(
  kept: Naming | null,
  row: Row,
  kind: string,
  position: number | undefined,
  shelving: ReadonlySet<string>
): Naming | null {
  if (position === undefined || row.position === position) return kept
  if (!textsOf(row.partOfCollections).some((one) => shelving.has(one))) return kept
  if (kept !== null) return { ...kept, values: { ...kept.values, position } }
  const slug = typeof row.slug === "string" ? row.slug : ""
  return { pageTypeSlug: kind, slug, merge: true, values: { position } }
}
