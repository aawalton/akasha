import { readFileSync } from "node:fs"
import { resolve, sep } from "node:path"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"

interface VerdictCoverage {
  readonly observed: number
  readonly declared: number | null
  readonly unit: string
}

export interface PopulationGap {
  readonly label: string
  readonly reason: string
}

export type MembershipBound =
  | {
      readonly kind: "enumerated"
      readonly because: string
    }
  | {
      readonly kind: "atLeast"
      readonly members: number
      readonly from: string
    }

function membershipFloor(membership: MembershipBound): number {
  return membership.kind === "atLeast" ? membership.members : 0
}

interface PopulationMembers {
  readonly examined: readonly string[]
  readonly unexaminable: readonly PopulationGap[]
  readonly unit: string
  readonly root: string | null
  readonly membership: MembershipBound
}

function foldRoot(seen: readonly string[] | null, site: string): readonly string[] {
  const segments = resolve(site).split(sep)
  if (seen === null) return segments
  const shared: string[] = []
  for (let i = 0; i < seen.length && i < segments.length; i++) {
    if (seen[i] !== segments[i]) break
    shared.push(segments[i] ?? "")
  }
  return shared
}

function rootOf(seen: readonly string[] | null): string | null {
  if (seen === null) return null
  const joined = seen.join(sep)
  return joined === "" ? sep : joined
}

export type Population = PopulationMembers & { readonly __brand: "Population" }

function Population(members: PopulationMembers): Population {
  return members as Population
}

export function examinePopulation<M, V>(args: {
  readonly members: readonly M[]
  readonly unit: string
  readonly labelOf: (member: M) => string
  readonly siteOf: (member: M) => string | null
  readonly examine: (member: M) => readonly V[]
  readonly membership: MembershipBound
}): { readonly population: Population; readonly violations: readonly V[] } {
  const examined: string[] = []
  const unexaminable: PopulationGap[] = []
  const violations: V[] = []
  let rootSeen: readonly string[] | null = null

  for (const member of args.members) {
    const label = args.labelOf(member)
    const site = args.siteOf(member)
    if (site !== null) rootSeen = foldRoot(rootSeen, site)
    let found: readonly V[]
    try {
      found = args.examine(member)
    } catch (err) {
      unexaminable.push({ label, reason: errorMessage(err) })
      continue
    }
    examined.push(label)
    violations.push(...found)
  }

  return {
    population: Population({
      examined,
      unexaminable,
      unit: args.unit,
      root: rootOf(rootSeen),
      membership: args.membership,
    }),
    violations,
  }
}

export function examineFilePopulation<V>(args: {
  readonly files: readonly string[]
  readonly unit: string
  readonly scan: (label: string, source: string) => readonly V[]
  readonly pathOf?: (label: string) => string
  readonly readFile?: (path: string) => string
  readonly membership: MembershipBound
}): { readonly population: Population; readonly violations: readonly V[] } {
  const read = args.readFile ?? ((path: string) => readFileSync(path, "utf-8"))
  const pathOf = (label: string): string => (args.pathOf === undefined ? label : args.pathOf(label))
  return examinePopulation({
    members: args.files,
    unit: args.unit,
    membership: args.membership,
    labelOf: (label) => label,
    siteOf: pathOf,
    examine: (label) => args.scan(label, read(pathOf(label))),
  })
}

export type PopulationCoverage = VerdictCoverage & { readonly declared: number }

export function populationCoverage(population: Population): PopulationCoverage {
  const observed = population.examined.length
  const arrived = observed + population.unexaminable.length
  return {
    observed,
    declared: Math.max(arrived, membershipFloor(population.membership)),
    unit: population.unit,
  }
}

export function populationNeverAcquired(population: Population): number {
  const arrived = population.examined.length + population.unexaminable.length
  return Math.max(0, membershipFloor(population.membership) - arrived)
}

export function populationCertifies(population: Population): boolean {
  if (population.unexaminable.length > 0) return false
  if (populationNeverAcquired(population) > 0) return false
  return population.examined.length > 0
}
