import { fetchHealthExport } from "akasha/alan/harness/health-samples-import/export-fetching/export-fetching.module.code.ts"
import {
  formatSnapshot,
  SNAPSHOT_METRICS,
  summarizeSnapshot,
} from "akasha/alan/harness/health-samples-import/health-snapshot/health-snapshot.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { days as daysArgument } from "akasha/commands/arguments/pages/days.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { macbookFile } from "akasha/commands/arguments/pages/macbook-file.argument.ts"
import {
  asJson,
  DATA,
  OPERATIONAL,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import { lines } from "akasha/commands/modules/yaml-lines/yaml-lines.module.code.ts"
import { alanElaine as page } from "akasha/commands/pages/alan/elaine/alan-elaine.command.ts"

export const NAMED = [json, daysArgument, macbookFile] as const

const DEFAULT_DAYS = 14

const DAY_MS = 86_400_000

export type Window = { readonly days: number } | { readonly refused: readonly string[] }

export function windowIn(said: number | undefined): Window {
  if (said === undefined) return { days: DEFAULT_DAYS }
  if (said < 1) {
    return {
      refused: [`\`${daysArgument.said}\` takes a positive integer, and \`${said}\` is none`],
    }
  }
  return { days: said }
}

export function sinceDay(days: number, nowMs: number): string {
  return new Date(nowMs - (days + 1) * DAY_MS).toISOString().slice(0, 10)
}

export async function alanElaine(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) {
    return refusedBy([...read.refused, `\`${given.calledAs}\` did nothing`])
  }
  const taken = read.taken
  const window = windowIn(taken.days)
  if ("refused" in window) {
    return refusedBy([...window.refused, `\`${given.calledAs}\` did nothing`])
  }
  try {
    const nowMs = Date.now()
    const exported = await fetchHealthExport({
      path: taken.macbookFile,
      sinceDay: sinceDay(window.days, nowMs),
      metrics: SNAPSHOT_METRICS,
    })
    if (exported.sourceFile === null) {
      return refused(
        "no Apple Health export is on the macbook — export all health data from the iPhone's " +
          `Health app and drop the zip in the macbook's downloads, or name one with \`${macbookFile.said}\``,
        DATA
      )
    }
    const snapshot = summarizeSnapshot(exported, window.days, nowMs)
    if (taken.json) return asJson(snapshot)
    return told([...lines(formatSnapshot(snapshot))])
  } catch (thrown) {
    return refused(whyOf(thrown), OPERATIONAL)
  }
}
