import { readFileSync } from "node:fs"
import { join } from "node:path"
import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { capturedAt } from "akasha/command/argument/pages/captured-at.argument.ts"
import { character } from "akasha/command/argument/pages/character.argument.ts"
import { json } from "akasha/command/argument/pages/json.argument.ts"
import { readingCount } from "akasha/command/argument/pages/reading-count.argument.ts"
import { readingId } from "akasha/command/argument/pages/reading-id.argument.ts"
import {
  asJson,
  DATA,
  INPUT,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  chosenIn,
  type ReadingLine,
  readingLinesIn,
  shortIdOf,
} from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import { temperTooltipCompare as page } from "akasha/command/pages/temper/tooltip-compare/temper-tooltip-compare.command.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import {
  type ActiveHeld,
  equationStatsOf,
  NOTHING_ACTIVE,
  tooltipPairingOf,
} from "akasha/temper/player/character/stat/modules/skill-equation/skill-equation.module.code.ts"
import {
  activeOf,
  type BuildHeld,
  type Equations,
  equationsOf,
  healingDoneOf,
  heldOfBuild,
  heldOfCase,
  heldSetOf,
  type SkillLines,
  skillLinesOf,
  skillStatsOf,
  skillValuesIn,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"
import type {
  TooltipNumber,
  TooltipPairing,
} from "akasha/temper/player/character/stat/modules/tooltip-pairing/tooltip-pairing.module.code.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

const NAMED = [character, readingCount, capturedAt, readingId, json]

const NUMBER = 8

const CASE_BARS = { frontBar: "primary-weapon-bar", backBar: "backup-weapon-bar" } as const

export type ComparedSkill = {
  readonly slot: number
  readonly abilityId: number
  readonly name: string
  readonly pairing: TooltipPairing | null
}

export type Tally = {
  readonly numbers: number
  readonly matched: number
  readonly unpaired: number
  readonly unmodelled: number
}

export function comparedSkillsOf(
  reading: ReadingLine["reading"],
  equations: Equations,
  held: ReadonlySet<string>,
  active: ActiveHeld = NOTHING_ACTIVE,
  healingDone = 0,
  lineOf: SkillLines = new Map(),
  ranks: Readonly<Record<string, number>> = {}
): readonly ComparedSkill[] {
  const stats = equationStatsOf(reading.stats, healingDone)
  const skills = reading.skills ?? []
  return skills.map((skill) => {
    const lines = equations.get(skill.abilityId)
    const skillStats = skillStatsOf(stats, skill.abilityId, skills, held, lineOf, ranks)
    return {
      slot: skill.slot,
      abilityId: skill.abilityId,
      name: skill.name,
      pairing:
        lines === undefined
          ? null
          : tooltipPairingOf(
              skill.description,
              lines,
              skillStats,
              held,
              active,
              skill.durationMs,
              skill.rank
            ),
    }
  })
}

export function tallyOf(skills: readonly ComparedSkill[]): Tally {
  const numbers = skills.flatMap((one) => (one.pairing?.paired === true ? one.pairing.numbers : []))
  return {
    numbers: numbers.length,
    matched: numbers.filter((one) => one.temper === one.game).length,
    unpaired: skills.filter((one) => one.pairing?.paired === false).length,
    unmodelled: skills.filter((one) => one.pairing === null).length,
  }
}

function cell(text: string): string {
  return text.padStart(NUMBER)
}

function numberLine(one: TooltipNumber): string {
  const gap = one.temper === null ? null : one.temper - one.game
  const said = gap === null ? "-" : `${gap > 0 ? "+" : ""}${String(gap)}`
  const mark = one.temper === one.game ? "=" : " "
  const kind = one.scaled ? "scaled" : "constant"
  const temper = one.temper === null ? "-" : String(one.temper)
  return `    ${mark} <<${String(one.placeholder)}>> ${cell(String(one.game))} ${cell(temper)} ${cell(said)}  ${kind}`
}

export function skillLines(one: ComparedSkill): readonly string[] {
  const head = `  ${one.name} (${String(one.abilityId)})`
  const { pairing } = one
  if (pairing === null) return [`${head}: Temper holds no equations for it`]
  if (!pairing.paired) {
    return [
      `${head}: unpaired, the tooltip shows ${String(pairing.shown.length)} numbers and the equations name ${String(pairing.equations)}`,
    ]
  }
  return [head, ...pairing.numbers.map(numberLine)]
}

export function tallyLine(tally: Tally): string {
  return `  ${String(tally.matched)} of ${String(tally.numbers)} tooltip numbers match, ${String(tally.unpaired)} skills unpaired, ${String(tally.unmodelled)} with no equations`
}

function headOf(line: ReadingLine): string {
  const { reading } = line
  const when = new Date(reading.capturedAt * 1000).toISOString()
  const combat = reading.inCombat ? "in combat" : "out of combat"
  return [shortIdOf(line.id), when, line.bar, `eso ${reading.esoVersion ?? "unsaid"}`, combat].join(
    "  "
  )
}

function blockOf(line: ReadingLine, skills: readonly ComparedSkill[]): readonly string[] {
  const kept = skills.length === 0 ? ["  no slotted skill kept"] : skills.flatMap(skillLines)
  return [
    headOf(line),
    `    ${" ".repeat(6)}${cell("game")} ${cell("temper")} ${cell("diff")}`,
    ...kept,
    tallyLine(tallyOf(skills)),
    "",
  ]
}

export async function temperTooltipCompare(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const slug = read.taken.character
  const found = listedAt(given.root, temperAccountCharacter.slug, slug)[0]
  if (found === undefined) return refused(`\`${slug}\` names no character page`, INPUT)
  const at = besideAt(found.path, readings.propertySlug, "jsonl")
  if (at === null) return refused(`\`${slug}\` sits where no readings file can`, DATA)
  let body: string
  try {
    body = readFileSync(join(given.root, at), "utf8")
  } catch (thrown) {
    return refused(`\`${slug}\` holds no readings: ${saidBy(thrown)}`, DATA)
  }
  const { lines, unread } = readingLinesIn(body)
  const chosen = chosenIn(lines, {
    last: read.taken.readingCount,
    capturedAt: read.taken.capturedAt,
    id: read.taken.readingId,
  })
  if ("refused" in chosen) return refused(`\`${slug}\`: ${chosen.refused}`, INPUT)
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  const skillValues = skillValuesIn(given.root)
  const equations = equationsOf(skillValues)
  const lineOf = skillLinesOf(skillValues)
  const byBuild = new Map<string, BuildHeld | undefined>()
  const buildOf = (hash: string): BuildHeld | undefined => {
    const build = byBuild.has(hash) ? byBuild.get(hash) : heldOfBuild(hash)
    byBuild.set(hash, build)
    return build
  }
  const compared = chosen.chosen.map((line) => {
    const bar = CASE_BARS[line.bar]
    const held = heldOfCase(buildOf(line.buildHash), line.reading, bar)
    const healingDone = healingDoneOf(line.buildHash, bar, line.reading)
    return {
      line,
      skills: comparedSkillsOf(
        line.reading,
        equations,
        heldSetOf(held),
        activeOf(held),
        healingDone,
        lineOf,
        held.ranks
      ),
    }
  })
  if (read.taken.json) {
    return asJson({
      character: slug,
      readings: compared.map(({ line, skills }) => ({
        id: line.id,
        capturedAt: line.reading.capturedAt,
        bar: line.bar,
        esoVersion: line.reading.esoVersion ?? null,
        inCombat: line.reading.inCombat,
        tally: tallyOf(skills),
        skills,
      })),
      unread,
    })
  }
  const first = unread[0]
  const unreadSaid =
    first === undefined
      ? []
      : [
          `${String(unread.length)} lines of the readings do not read; line ${String(first.line)}: ${first.why}`,
        ]
  return told([...compared.flatMap(({ line, skills }) => blockOf(line, skills)), ...unreadSaid])
}
