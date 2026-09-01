import { resolve } from "node:path"
import { alreadyRunning } from "@akasha/code-system/code-tests"
import type { Change } from "@akasha/pages-system/change"
import type { Shadow } from "@akasha/pages-system/shadow"
import { shadowAsked } from "@akasha/pages-system/shadow"
import { everythingIn } from "../change-walking/change-walking.module.code.ts"
import type { Scenario } from "../check-perturbing/check-perturbing.module.code.ts"
import {
  bodiesAs,
  bodiesFor,
  changeOf,
  contradictingOver,
  relandingOf,
  scenariosIn,
} from "../check-perturbing/check-perturbing.module.code.ts"
import { treeFrom } from "../check-tree/check-tree.module.code.ts"
import type { Gathered, Phase } from "../checking/checking.module.code.ts"
import { checksIn, judgingBy } from "../checking/checking.module.code.ts"

export const INSIDE_A_RUN = "a differential inside a test run judges nothing, so it is refused"

const HELD = "held"

const MOVED = "moved"

const NEVER = "never run"

const NAMED = "--check"

const SHOWN = 6

const WIDEST = 400

const SECOND = 1000

const SLUG_WIDE = 42

const STATE_WIDE = 11

export type State = typeof HELD | typeof MOVED | typeof NEVER

export type Shown = {
  readonly slug: string
  readonly scenario: string
  readonly agreeing: readonly string[]
  readonly contradicting: readonly string[]
}

export type Row = {
  readonly slug: string
  readonly runsOn: readonly Phase[]
  readonly state: State
  readonly ran: number
  readonly spoke: boolean
}

export type Seen = {
  readonly rows: readonly Row[]
  readonly scenarios: readonly string[]
  readonly dropped: readonly string[]
  readonly shown: readonly Shown[]
}

export function verdictFor(one: Gathered, change: Change): readonly string[] {
  return judgingBy([one])
    .over(change)
    .map((said) => `${said.path} — ${said.reason}`)
    .sort()
}

export function runningFor(every: readonly Gathered[], change: Change): ReadonlySet<string> {
  return new Set(judgingBy(every).checksFor(change))
}

function castable(change: Change): boolean {
  try {
    shadowAsked(change).reading.holds("")
    return true
  } catch {
    return false
  }
}

export function differed(one: readonly string[], two: readonly string[]): boolean {
  return one.length !== two.length || one.some((said, at) => said !== two[at])
}

type Taken = {
  readonly ran: ReadonlySet<string>
  readonly spoke: ReadonlySet<string>
  readonly moved: readonly Shown[]
}

function takenOver(root: string, every: readonly Gathered[], scenario: Scenario): Taken | null {
  const pristine = bodiesFor(root, [...scenario.after.keys()])
  const asked = (): Change => changeOf(root, pristine, scenario.after)
  if (!castable(asked())) return null
  const ran = runningFor(every, asked())
  const each = every.filter((one) => ran.has(one.slug))
  const agreeing = new Map<string, readonly string[]>()
  const against = new Map<string, readonly string[]>()
  try {
    bodiesAs(root, scenario.after)
    const first = asked()
    for (const one of each) agreeing.set(one.slug, verdictFor(one, first))
    bodiesAs(root, contradictingOver(scenario.after))
    const second = asked()
    for (const one of each) against.set(one.slug, verdictFor(one, second))
  } finally {
    bodiesAs(root, pristine)
  }
  const moved: Shown[] = []
  const spoke = new Set<string>()
  for (const one of each) {
    const said = agreeing.get(one.slug) ?? []
    const other = against.get(one.slug) ?? []
    if (said.length > 0 || other.length > 0) spoke.add(one.slug)
    if (!differed(said, other)) continue
    moved.push({ slug: one.slug, scenario: scenario.named, agreeing: said, contradicting: other })
  }
  return { ran, spoke, moved }
}

export function reachingFor(
  every: readonly Gathered[],
  already: ReadonlySet<string>,
  paths: readonly string[],
  shadow: Shadow
): readonly string[] {
  const found = new Set<string>()
  for (const one of every) {
    const takes = one.isInput
    if (takes === null || already.has(one.slug)) continue
    const at = paths.find((path) => {
      try {
        return takes(path, shadow)
      } catch {
        return false
      }
    })
    if (at !== undefined) found.add(at)
  }
  return [...found].sort()
}

function stateOf(slug: string, ran: ReadonlySet<string>, moved: ReadonlySet<string>): State {
  if (moved.has(slug)) return MOVED
  return ran.has(slug) ? HELD : NEVER
}

export function differingOver(
  root: string,
  every: readonly Gathered[],
  scenarios: readonly Scenario[]
): Seen {
  const ran = new Map<string, number>()
  const spoke = new Set<string>()
  const moved = new Set<string>()
  const shown: Shown[] = []
  const named: string[] = []
  const dropped: string[] = []
  for (const scenario of scenarios) {
    const taken = takenOver(root, every, scenario)
    if (taken === null) {
      dropped.push(scenario.named)
      continue
    }
    named.push(scenario.named)
    for (const slug of taken.ran) ran.set(slug, (ran.get(slug) ?? 0) + 1)
    for (const slug of taken.spoke) spoke.add(slug)
    for (const one of taken.moved) {
      moved.add(one.slug)
      shown.push(one)
    }
  }
  const seen = new Set(ran.keys())
  const rows = every.map((one) => ({
    slug: one.slug,
    runsOn: one.runsOn,
    state: stateOf(one.slug, seen, moved),
    ran: ran.get(one.slug) ?? 0,
    spoke: spoke.has(one.slug),
  }))
  return { rows, scenarios: named, dropped, shown }
}

export function scenariosOver(root: string, every: readonly Gathered[]): readonly Scenario[] {
  const all = everythingIn(root)
  const authored = scenariosIn(root, all.changed)
  const already = new Set<string>()
  for (const one of authored) {
    const paths = [...one.after.keys()]
    const change = changeOf(root, bodiesFor(root, paths), one.after)
    for (const slug of runningFor(every, change)) already.add(slug)
  }
  const reach = reachingFor(every, already, all.changed, shadowAsked(all))
  return reach.length === 0 ? authored : [...authored, relandingOf(root, reach)]
}

function shortly(said: string): string {
  const one = said.split("\n")[0] ?? said
  return one.length > WIDEST ? `${one.slice(0, WIDEST)}…` : one
}

function saidOver(said: readonly string[]): readonly string[] {
  if (said.length === 0) return ["    no refusal"]
  return said.slice(0, SHOWN).map((one) => `    ${shortly(one)}`)
}

function rowOf(one: Row): string {
  const phases = one.runsOn.length === 0 ? "no phase" : one.runsOn.join(",")
  const said = one.spoke ? "refused something" : "refused nothing"
  const over = `ran on ${one.ran}, ${said}`
  return `${one.state.padEnd(STATE_WIDE)}${one.slug.padEnd(SLUG_WIDE)}${over} — ${phases}`
}

export function reportOf(seen: Seen): readonly string[] {
  const said: string[] = [`${seen.scenarios.length} scenarios ran:`]
  for (const one of seen.scenarios) said.push(`  ${one}`)
  for (const one of seen.dropped) said.push(`  dropped, casting no shadow: ${one}`)
  const measured = seen.rows.filter((one) => one.state !== NEVER)
  const spoke = measured.filter((one) => one.spoke)
  said.push("", `coverage: ${measured.length} of ${seen.rows.length} checks were measured`)
  said.push(`${spoke.length} of those ${measured.length} refused something in one reading`, "")
  for (const state of [MOVED, HELD, NEVER]) {
    for (const one of seen.rows.filter((row) => row.state === state)) said.push(rowOf(one))
  }
  for (const one of seen.shown) {
    said.push("", `${one.slug} moved on ${one.scenario}`, "  with the tree agreeing:")
    said.push(...saidOver(one.agreeing))
    said.push("  with the tree contradicting:")
    said.push(...saidOver(one.contradicting))
  }
  return said
}

export function narrowedTo(
  every: readonly Gathered[],
  argv: readonly string[]
): readonly Gathered[] {
  const named = argv.filter((one, at) => argv[at - 1] === NAMED && one !== NAMED)
  return named.length === 0 ? every : every.filter((one) => named.includes(one.slug))
}

function saying(): undefined {
  if (alreadyRunning()) {
    process.stderr.write(`${INSIDE_A_RUN}\n`)
    process.exit(1)
  }
  const from = resolve(process.cwd())
  const every = narrowedTo(checksIn(from), process.argv.slice(2))
  const tree = treeFrom(from)
  const began = Date.now()
  try {
    const seen = differingOver(tree.root, every, scenariosOver(tree.root, every))
    for (const one of reportOf(seen)) process.stdout.write(`${one}\n`)
    process.stdout.write(`\nthe differential took ${Math.round((Date.now() - began) / SECOND)}s\n`)
  } finally {
    tree.sweep()
  }
  return undefined
}

if (import.meta.main) saying()
