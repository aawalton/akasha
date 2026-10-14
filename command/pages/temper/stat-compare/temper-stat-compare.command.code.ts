import { readFileSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { temperStatCompare as page } from "akasha/command/pages/temper/stat-compare/temper-stat-compare.command.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { calculateReadingStatsByBar } from "akasha/temper/player/character/stat/modules/metric-calculator/metric-calculator.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  type CharacterCompletion,
  characterCompletionSchema,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const NAMED = [character, json]

const BARS = [
  ["frontBar", "primary-weapon-bar"],
  ["backBar", "backup-weapon-bar"],
] as const

type StatGap = { readonly stat: string; readonly game: number; readonly estimate: number }

type BarComparison = {
  readonly bar: string
  readonly capturedAt: number
  readonly inCombat: boolean
  readonly activeBuffs: readonly string[]
  readonly unmatchedBuffs: readonly string[]
  readonly gaps: readonly StatGap[]
}

function completionPath(slug: string): string {
  const folder = "temper/player/character/temper-account-character/pages"
  return join(akashaRoot(), folder, slug, `${slug}.temper-account-character.completion.json`)
}

function barLines(compared: BarComparison): readonly string[] {
  const when = new Date(compared.capturedAt * 1000).toISOString()
  const combat = compared.inCombat ? "in combat" : "out of combat"
  const lines = [
    `${compared.bar}, read ${when}, ${combat}`,
    `  buffs the game listed: ${compared.activeBuffs.join(", ") || "none"}`,
  ]
  if (compared.unmatchedBuffs.length > 0) {
    lines.push(`  listed buffs no buff page names: ${compared.unmatchedBuffs.join(", ")}`)
  }
  if (compared.gaps.length === 0) lines.push("  every stat the game reported matches the estimate")
  for (const gap of compared.gaps) {
    const delta = gap.estimate - gap.game
    const signed = delta > 0 ? `+${String(delta)}` : String(delta)
    lines.push(
      `  ${gap.stat}: game ${String(gap.game)}, estimate ${String(gap.estimate)} (${signed})`
    )
  }
  return lines
}

export async function temperStatCompare(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.character
  if (slug === undefined) return refused("a character is named by its page's slug", INPUT)

  let completion: CharacterCompletion
  try {
    const body: unknown = JSON.parse(readFileSync(completionPath(slug), "utf8"))
    completion = characterCompletionSchema.parse(body)
  } catch (thrown) {
    return refused(`no completion is read for \`${slug}\`: ${saidBy(thrown)}`, DATA)
  }
  const { buildHash, reportedStats } = completion
  if (buildHash === undefined) return refused(`\`${slug}\` holds no build`, DATA)
  if (reportedStats === undefined) return refused(`\`${slug}\` holds no reported stats`, DATA)

  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  const build = decodeBuild(buildHash)
  if (build === null) return refused(`the build \`${slug}\` holds is not one this decodes`, DATA)

  const compared: BarComparison[] = []
  for (const [readingKey, bar] of BARS) {
    const reading = reportedStats[readingKey]
    if (reading === undefined) continue
    if (reading.activeBuffs === undefined) {
      return refused(
        `the ${readingKey} reading of \`${slug}\` kept no buff names, so a fresh reading is taken first`,
        DATA
      )
    }
    const names = reading.activeBuffs.map((buff) => buff.name)
    const estimated = calculateReadingStatsByBar(
      build,
      bar,
      reading.activeBuffs,
      reading.championPoints
    )
    const gaps: StatGap[] = []
    for (const [stat, game] of Object.entries(reading.stats)) {
      const estimate = (estimated.metrics as Record<string, { value: number } | undefined>)[stat]
      const value = estimate?.value ?? 0
      if (value !== game) gaps.push({ stat, game, estimate: value })
    }
    compared.push({
      bar: readingKey,
      capturedAt: reading.capturedAt,
      inCombat: reading.inCombat,
      activeBuffs: names,
      unmatchedBuffs: estimated.unmatchedBuffNames,
      gaps,
    })
  }

  if (read.taken.json) return asJson({ character: slug, bars: compared })
  return told(compared.flatMap((one) => [...barLines(one), ""]))
}
