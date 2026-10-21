import {
  type FileChange,
  missing,
  refusing,
  type Said,
  type Splice,
  splicing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const AT = "at"

const OF = "of"

const TO = "to"

const FORMULA = ".temper-metric.formula.ts"

const READS = /metricIds:\s*\[([^\]]*)\]/g

export type RenameMetricReadsAsked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

export function readsIn(text: string, of: string, to: string): readonly Splice[] {
  const named = JSON.stringify(of)
  const found: Splice[] = []
  for (const list of text.matchAll(READS)) {
    const inner = list[1] ?? ""
    const opens = list.index + list[0].indexOf("[") + 1
    for (let at = inner.indexOf(named); at >= 0; at = inner.indexOf(named, at + named.length)) {
      found.push({ from: opens + at, to: opens + at + named.length, put: JSON.stringify(to) })
    }
  }
  return found
}

export function renameMetricReads(world: World, given: RenameMetricReadsAsked): Said {
  if (given.of === given.to) return refusing(`\`of\` and \`to\` both name \`${given.of}\``)
  const edits: FileChange[] = []
  for (const path of world.under(given.at)) {
    if (!path.endsWith(FORMULA)) continue
    const text = world.textOf(path)
    if (text === null) continue
    const found = readsIn(text, given.of, given.to)
    if (found.length === 0) continue
    edits.push(...splicing(path, text, found))
  }
  if (edits.length === 0) {
    return refusing(`no formula under \`${given.at}\` reads \`${given.of}\`, so no read is renamed`)
  }
  return stating(edits)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT, OF, TO]

export function runChange(world: World, given: Asked): Said {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const of = given[OF]
  if (of === undefined) return refusing(missing(OF))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return renameMetricReads(world, { at, of, to })
}
