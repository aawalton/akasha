import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import {
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { characterCompletionAt } from "akasha/command/pages/temper/modules/character-completion-reading/character-completion-reading.module.code.ts"
import { temperSkillCheck as page } from "akasha/command/pages/temper/skill-check/temper-skill-check.command.ts"
import { valuesOfType } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import {
  type EquationStats,
  equationOf,
  equationStatsOf,
  equationValue,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"
import type { CharacterCompletion } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const NAMED = [character]

const BARS = ["frontBar", "backBar"] as const

const SHOWN = /\|c[0-9a-fA-F]{6}(-?\d+(?:\.\d+)?)\|r/g

const NAMES_A_NUMBER = /^<<\d+>> = -?\d/

function equationsById(root: string): ReadonlyMap<number, readonly string[]> {
  const found = new Map<number, readonly string[]>()
  for (const one of valuesOfType(root, "temper-skill")) {
    const id = one.value.esoSkillId
    const equations = one.value.equations
    if (typeof id === "number" && Array.isArray(equations)) {
      found.set(
        id,
        equations.filter((line): line is string => typeof line === "string")
      )
    }
  }
  return found
}

function pairedLines(
  description: string,
  equations: readonly string[],
  stats: EquationStats
): string[] {
  const shown = [...description.matchAll(SHOWN)].map((one) => Number(one[1]))
  const numbered = equations.filter((line) => NAMES_A_NUMBER.test(line))
  const lines: string[] = []
  numbered.forEach((line, at) => {
    const equation = equationOf(line)
    const tooltip = shown[at]
    const worked = equationValue(equation, stats)
    if (equation === undefined || !equation.scaled || tooltip === undefined) return
    const kind = equation.tags
      .filter((tag) => !/[=(]/.test(tag))
      .slice(1, 3)
      .join(" ")
    if (worked === undefined || worked === 0) {
      lines.push(
        `  <<${String(equation.placeholder)}>> ${kind}: tooltip ${String(tooltip)}, no equation read`
      )
      return
    }
    lines.push(
      `  <<${String(equation.placeholder)}>> ${kind}: tooltip ${String(tooltip)}, UESP ${String(Math.round(worked))}, ×${(tooltip / worked).toFixed(3)}`
    )
  })
  return lines
}

type Reading = NonNullable<NonNullable<CharacterCompletion["reportedStats"]>["frontBar"]>

function archiveLine(reading: Reading): string {
  if (reading.inArchive === undefined) return "Archive boons: not captured in this reading"
  if (!reading.inArchive) return "outside the Infinite Archive"
  const boons = reading.archiveBoons ?? []
  if (boons.length === 0) return "in the Infinite Archive, no verse or vision held"
  const named = boons.map((one) =>
    one.stacks > 1 ? `${one.name} ×${String(one.stacks)}` : one.name
  )
  return `in the Infinite Archive with ${named.join(", ")}`
}

export async function temperSkillCheck(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return refused(read.refused.join(" "), INPUT)
  const slug = read.taken.character
  if (slug === undefined) return refused("a character is named by its page's slug", INPUT)
  let completion: CharacterCompletion
  try {
    completion = characterCompletionAt(slug)
  } catch (thrown) {
    return refused(`no completion is read for \`${slug}\`: ${saidBy(thrown)}`, DATA)
  }
  const byId = equationsById(given.root)
  const lines: string[] = []
  for (const bar of BARS) {
    const reading = completion.reportedStats?.[bar]
    if (reading?.skills === undefined) continue
    const stats = equationStatsOf(reading.stats)
    lines.push(
      `${bar}: max health ${String(stats.health)}, stat ${String(stats.maxStat)}, power ${String(stats.maxPower)}`
    )
    lines.push(`  ${archiveLine(reading)}`)
    for (const skill of reading.skills) {
      const equations = byId.get(skill.abilityId)
      if (equations === undefined) {
        lines.push(`${skill.name} (${String(skill.abilityId)}): UESP fit no equations`)
        continue
      }
      lines.push(`${skill.name} (${String(skill.abilityId)})`)
      lines.push(...pairedLines(skill.description, equations, stats))
    }
  }
  return told(lines)
}
