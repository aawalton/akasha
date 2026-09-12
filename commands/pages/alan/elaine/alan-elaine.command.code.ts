import { fetchHealthExport } from "akasha/alan/harness/health-samples-import/export-fetching/export-fetching.module.code.ts"
import {
  formatSnapshot,
  SNAPSHOT_METRICS,
  summarizeSnapshot,
} from "akasha/alan/harness/health-samples-import/health-snapshot/health-snapshot.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { lines } from "akasha/commands/modules/yaml-lines/yaml-lines.module.code.ts"

export const DAYS = "--days"

export const FILE_PATH = "--file-path"

export const JSON_SAID = "--json"

const VALUED = new Set([DAYS, FILE_PATH])

const DEFAULT_DAYS = 14

const DAY_MS = 86_400_000

export type Read =
  | {
      readonly days: number
      readonly path: string | undefined
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const said = new Map<string, string>()
  let json = false
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (one === JSON_SAID) {
      json = true
      continue
    }
    if (VALUED.has(one)) {
      const value = argv[at + 1]
      at += 1
      if (value === undefined) {
        refusals.push(`\`${one}\` names a value, and nothing followed it`)
        continue
      }
      said.set(one, value)
      continue
    }
    refusals.push(
      `\`${one}\` is no word this takes — it takes \`${DAYS}\`, \`${FILE_PATH}\` and \`${JSON_SAID}\``
    )
  }
  let days = DEFAULT_DAYS
  const daysSaid = said.get(DAYS)
  if (daysSaid !== undefined) {
    const held = Number(daysSaid)
    if (!Number.isInteger(held) || held < 1) {
      refusals.push(`\`${DAYS}\` takes a positive integer, and \`${daysSaid}\` is none`)
    } else {
      days = held
    }
  }
  if (refusals.length > 0) return { refused: refusals }
  return { days, path: said.get(FILE_PATH), json }
}

export function sinceDay(days: number, nowMs: number): string {
  return new Date(nowMs - (days + 1) * DAY_MS).toISOString().slice(0, 10)
}

export async function alanElaine(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) {
    return { report: [], refusals: [...read.refused, `\`${given.calledAs}\` did nothing`], code: 1 }
  }
  try {
    const nowMs = Date.now()
    const exported = await fetchHealthExport({
      path: read.path,
      sinceDay: sinceDay(read.days, nowMs),
      metrics: SNAPSHOT_METRICS,
    })
    if (exported.sourceFile === null) {
      return refused(
        "no Apple Health export is on the macbook — export all health data from the iPhone's " +
          `Health app and drop the zip in the macbook's downloads, or name one with \`${FILE_PATH}\``,
        2
      )
    }
    const snapshot = summarizeSnapshot(exported, read.days, nowMs)
    if (read.json) return { report: [JSON.stringify(snapshot)], refusals: [], code: 0 }
    return { report: [...lines(formatSnapshot(snapshot))], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), 3)
  }
}
