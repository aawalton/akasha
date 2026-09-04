import { fetchHealthExport } from "@akasha/health-samples-import/export-fetching"
import {
  formatSnapshot,
  SNAPSHOT_METRICS,
  summarizeSnapshot,
} from "@akasha/health-samples-import/health-snapshot"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { refused } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const HEALTH_SNAPSHOT = "health-snapshot"

export const DAYS = "--days"

export const PATH = "--path"

export const JSON_SAID = "--json"

const ACTS = [HEALTH_SNAPSHOT]

const VALUED = new Set([DAYS, PATH])

const DEFAULT_DAYS = 14

const DAY_MS = 86_400_000

export type Read =
  | {
      readonly act: string
      readonly days: number
      readonly path: string | undefined
      readonly json: boolean
    }
  | { readonly refused: readonly string[] }

function acts(): string {
  return ACTS.join("`, `")
}

export function readIn(argv: readonly string[]): Read {
  const refusals: string[] = []
  const words: string[] = []
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
    if (one.startsWith("-")) {
      refusals.push(
        `\`${one}\` is no flag this takes — it takes \`${DAYS}\`, \`${PATH}\` and \`${JSON_SAID}\``
      )
      continue
    }
    words.push(one)
  }
  const [act, ...rest] = words
  if (act === undefined) {
    return { refused: [...refusals, `this names no act — it carries \`${acts()}\``] }
  }
  if (!ACTS.includes(act)) {
    refusals.push(`\`${act}\` is no act this carries — it carries \`${acts()}\``)
  }
  for (const stray of rest) {
    refusals.push(`\`${stray}\` follows the act \`${act}\`, and one call names one act`)
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
  return { act, days, path: said.get(PATH), json }
}

export function sinceDay(days: number, nowMs: number): string {
  return new Date(nowMs - (days + 1) * DAY_MS).toISOString().slice(0, 10)
}

export function linesOf(said: string): readonly string[] {
  const every = said.split("\n")
  while (every.length > 0 && every[every.length - 1] === "") every.pop()
  return every
}

export async function elaine(argv: readonly string[], given: Given): Promise<Answer> {
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
        "no Apple Health export stands on the macbook — export all health data from the iPhone's " +
          `Health app and drop the zip in the macbook's downloads, or name one with \`${PATH}\``,
        2
      )
    }
    const snapshot = summarizeSnapshot(exported, read.days, nowMs)
    if (read.json) return { report: [JSON.stringify(snapshot)], refusals: [], code: 0 }
    return { report: [...linesOf(formatSnapshot(snapshot))], refusals: [], code: 0 }
  } catch (thrown) {
    return refused(whyOf(thrown), 3)
  }
}
