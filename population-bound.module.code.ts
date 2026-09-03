import {
  type Population,
  type PopulationGap,
  populationCoverage,
  populationNeverAcquired,
} from "../population/population.module.code.ts"

export function renderBound(population: Population): string {
  const { observed, declared, unit } = populationCoverage(population)
  if (declared === 0) {
    return `[EMPTY POPULATION — 0 ${unit}: this run examined nothing, so it certifies nothing]`
  }
  const bound = boundForm({
    observed,
    declared,
    unit,
    unreadable: population.unexaminable.length,
    absent: populationNeverAcquired(population),
  })
  return `${bound} ${renderRootGroup(population.root)}`
}

function renderRootGroup(root: string | null): string {
  if (root === null) {
    return "[read under: NO TREE — no member of this population has a site on this filesystem]"
  }
  return `[read under: ${root}]`
}

function boundForm(args: {
  readonly observed: number
  readonly declared: number
  readonly unit: string
  readonly unreadable: number
  readonly absent: number
}): string {
  const { observed, declared, unit, unreadable, absent } = args
  if (unreadable > 0 && absent > 0) {
    return `[over ${observed} of ${declared} ${unit} — ${unreadable} could not be examined, ${absent} never arrived]`
  }
  if (absent > 0) {
    return `[over ${observed} of ${declared} ${unit} — ${absent} never arrived]`
  }
  if (unreadable > 0) {
    return `[over ${observed} of ${declared} ${unit} — ${unreadable} could not be examined]`
  }
  return `[over ${observed} of ${declared} ${unit}]`
}

const SHORTFALL_SAMPLE = 10

function gapLines(gaps: readonly PopulationGap[]): readonly string[] {
  const shown = gaps.slice(0, SHORTFALL_SAMPLE)
  const lines = shown.map((gap) => `  - ${gap.label} — ${gap.reason}`)
  if (gaps.length > shown.length) lines.push(`  … and ${gaps.length - shown.length} more`)
  return lines
}

export function renderShortfall(population: Population, tag: string): readonly string[] {
  const lines: string[] = []
  const absent = populationNeverAcquired(population)
  if (absent > 0 && population.membership.kind === "atLeast") {
    lines.push(
      `${tag}NEVER ACQUIRED — the population holds at least ${population.membership.members} ${population.unit} per ${population.membership.from}, and only ${population.examined.length + population.unexaminable.length} reached this run, so it certifies nothing about the other ${absent}.`
    )
  }
  if (population.unexaminable.length > 0) {
    lines.push(
      `${tag}NOT EXAMINED — ${population.unexaminable.length} ${population.unit} this run enumerated and could not read, so it certifies nothing about them:`,
      ...gapLines(population.unexaminable)
    )
  }
  return lines
}
