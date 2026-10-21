import {
  type Answer,
  type FileChange,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { temperScribedSkill } from "akasha/temper/catalog/skill/temper-scribed-skill/temper-scribed-skill.page-type.ts"
import { temperSkill } from "akasha/temper/catalog/skill/temper-skill.page-type.ts"
import { loadSetCatalog } from "akasha/temper/player/character/characters-equipment/modules/set-catalog-loading/set-catalog-loading.module.code.ts"
import { loadSkillCatalog } from "akasha/temper/player/character/skill/modules/skill-catalog-loading/skill-catalog-loading.module.code.ts"
import { loadMetricCatalog } from "akasha/temper/player/character/stat/modules/metric-catalog-loading/metric-catalog-loading.module.code.ts"
import { linesOf } from "akasha/temper/player/character/stat/modules/reading-line-picking/reading-line-picking.module.code.ts"
import {
  type Bar,
  type BuildHeld,
  type CaseListed,
  type Equations,
  equationsOf,
  everyTooltipCase,
  healingDoneOf,
  heldOfBuild,
  heldOfCase,
  pinnedTooltipCaseOf,
  type ReadingCalculated,
  tooltipCaseOf,
  tooltipCaseShape,
  tooltipCaseText,
} from "akasha/temper/player/character/stat/modules/tooltip-case/tooltip-case.module.code.ts"
import { verifiedTooltips } from "akasha/temper/player/character/stat/temper-tooltip-case/properties/verified-tooltips.file-property.ts"
import { temperTooltipCase } from "akasha/temper/player/character/stat/temper-tooltip-case/temper-tooltip-case.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"
import { reportedStatsReadingSchema } from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

const CASES = "cases"

const LINE_BARS = { "primary-weapon-bar": "frontBar", "backup-weapon-bar": "backBar" } as const

type Asked = Readonly<Record<string, string>>

type HeldOf = (hash: string) => BuildHeld | undefined

type HealingOf = (hash: string, bar: Bar, reading: ReadingCalculated) => number | undefined

function noHealing(): undefined {
  return undefined
}

function restated(
  world: World,
  listed: CaseListed,
  heldOf: HeldOf,
  equations: Equations,
  healingOf: HealingOf
): FileChange | string {
  const { path: pageAt, slug } = listed
  const at = besideAt(pageAt, verifiedTooltips.propertySlug, "json")
  const text = at === null ? null : world.textOf(at)
  if (at === null || text === null) return `\`${slug}\` holds no verified tooltips`
  const parsed = tooltipCaseShape.safeParse(JSON.parse(text))
  if (!parsed.success) return `the verified tooltips of \`${slug}\` do not read`
  const { pinned, gaps, ...read } = parsed.data
  const characterAt = world.index.listedAt(temperAccountCharacter.slug, read.character)[0]?.path
  const readingsAt =
    characterAt === undefined ? null : besideAt(characterAt, readings.propertySlug, "jsonl")
  const lines = readingsAt === null ? null : world.textOf(readingsAt)
  if (lines === null) return `\`${read.character}\` of \`${slug}\` holds no readings`
  const line = linesOf(lines).find(
    (one) => one.bar === LINE_BARS[read.bar] && one.reading.capturedAt === read.capturedAt
  )
  if (line === undefined) return `\`${slug}\` names a reading \`${read.character}\` does not hold`
  const reading = reportedStatsReadingSchema.safeParse(line.reading)
  if (!reading.success) return `the reading \`${line.id}\` of \`${slug}\` does not read`
  const durations = new Map(
    (reading.data.skills ?? []).map((one) => [one.abilityId, one.durationMs] as const)
  )
  const skills = read.skills.map((one) => ({
    ...one,
    durationMs: durations.get(one.abilityId) ?? one.durationMs,
  }))
  const held = heldOfCase(heldOf(line.buildHash), reading.data, read.bar)
  const healingDone = healingOf(line.buildHash, read.bar, reading.data) ?? read.healingDone
  const caseRead = {
    ...read,
    ...held,
    skills,
    ...(healingDone === undefined ? {} : { healingDone }),
  }
  const fresh = pinnedTooltipCaseOf(caseRead, equations)
  const kept = new Set([...Object.keys(pinned), ...Object.keys(gaps)])
  const unkept = (numbers: Readonly<Record<string, number>>) =>
    Object.fromEntries(Object.entries(numbers).filter(([formula]) => !kept.has(formula)))
  const contentTo = tooltipCaseText(
    tooltipCaseOf(
      caseRead,
      { ...pinned, ...unkept(fresh.pinned) },
      { ...gaps, ...unkept(fresh.gaps) }
    )
  )
  return { kind: "replace", path: at, contentFrom: text, contentTo }
}

function noEquations(): Equations {
  return new Map()
}

export function equationsHeldIn(world: World): Equations {
  return equationsOf(
    [temperSkill.slug, temperScribedSkill.slug].flatMap((type) => [
      ...world.index.valuesByPath(type).values(),
    ])
  )
}

export function restateTooltipCasesCommand(
  world: World,
  given: Asked,
  heldOf: HeldOf = () => undefined,
  listed: (root: string) => readonly CaseListed[] = everyTooltipCase,
  equationsHeld: (over: World) => Equations = noEquations,
  healingOf: HealingOf = noHealing
): Answer {
  const named = given[CASES]
  const slugs = named
    ?.split("\n")
    .map((one) => one.trim())
    .filter((one) => one !== "")
  if (slugs !== undefined && slugs.length === 0) return refusing(`\`${CASES}\` names no case`)
  const cases: CaseListed[] = []
  if (slugs === undefined) cases.push(...listed(world.root))
  for (const slug of slugs ?? []) {
    const path = world.index.listedAt(temperTooltipCase.slug, slug)[0]?.path
    if (path === undefined) return refusing(`\`${slug}\` names no tooltip case`)
    cases.push({ path, slug })
  }
  const edits: FileChange[] = []
  const equations = equationsHeld(world)
  for (const one of cases) {
    const edit = restated(world, one, heldOf, equations, healingOf)
    if (typeof edit === "string") return refusing(edit)
    if (edit.kind === "replace" && edit.contentFrom !== edit.contentTo) edits.push(edit)
  }
  return stating(edits)
}

export const takes: readonly string[] = [CASES]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  await Promise.all([loadSkillCatalog(), loadSetCatalog(), loadMetricCatalog()])
  return restateTooltipCasesCommand(
    world,
    given,
    heldOfBuild,
    everyTooltipCase,
    equationsHeldIn,
    healingDoneOf
  )
}
