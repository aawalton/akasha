export const summary = "Recompute a day's wisdomWords and intelligenceWords from the git history"

import type { CommandHelp } from "@akasha/command-system/command-declaring"
import { parseArgs } from "@akasha/command-system/parse-args"
import { getEsoDayStr } from "@akasha/day/eso-day"
import { inputError } from "@akasha/errors-core/exit-code"

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/

export const help: CommandHelp = {
  flags: [
    {
      name: "--date",
      argLabel: "<YYYY-MM-DD>",
      valueShape: "token",
      description: "ESO day to recompute (default today)",
    },
    { name: "--json", description: "Emit a JSON envelope instead of TSV lines" },
  ],
  exits: [
    { code: 0, meaning: "wisdomWords and intelligenceWords recomputed and written" },
    { code: 1, meaning: "bad --date, or a day before the counts began" },
  ],
  examples: ["ops tracking words-sync", "ops tracking words-sync --date 2026-09-03"],
}

export default async function trackingWordsSync(args: readonly string[]): Promise<void> {
  const parsed = parseArgs(help, args)
  const json = parsed.boolean("--json")

  const dateRaw = parsed.string("--date")
  if (dateRaw !== undefined && !DAY_RE.test(dateRaw)) {
    throw inputError(`--date must be YYYY-MM-DD (got "${dateRaw}")`)
  }
  const dayStr = dateRaw ?? getEsoDayStr(new Date())

  const { rollupWisdomWordsForDay, rollupIntelligenceWordsForDay } = await import(
    "../topic-words/topic-words.module.code.ts"
  )

  console.error(`Recomputing wisdomWords and intelligenceWords for ${dayStr} from git…`)
  const wisdom = await rollupWisdomWordsForDay(dayStr)
  const intelligence = await rollupIntelligenceWordsForDay(dayStr)

  if (json) {
    process.stdout.write(
      `${JSON.stringify({
        day: dayStr,
        wisdomWords: wisdom.wisdomWords,
        wisdomShas: wisdom.shas,
        wisdomOutcome: wisdom.outcome,
        intelligenceWords: intelligence.intelligenceWords,
        intelligenceShas: intelligence.shas,
        intelligenceOutcome: intelligence.outcome,
      })}\n`
    )
    return
  }
  process.stdout.write(
    `day\t${dayStr}\n` +
      `wisdomWords\t${wisdom.wisdomWords}\n` +
      `wisdomOutcome\t${wisdom.outcome}\n` +
      `intelligenceWords\t${intelligence.intelligenceWords}\n` +
      `intelligenceOutcome\t${intelligence.outcome}\n`
  )
}
