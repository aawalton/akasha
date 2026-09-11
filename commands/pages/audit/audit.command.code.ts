import { resolve } from "node:path"
import { asked } from "akasha/checks/modules/audit-asking/audit-asking.module.code.ts"
import { commitOf } from "akasha/checks/modules/audit-serving/audit-serving.module.code.ts"
import { everythingIn } from "akasha/checks/modules/change-walking/change-walking.module.code.ts"
import type { Gathered } from "akasha/checks/modules/checking/checking.module.code.ts"
import {
  checksAt,
  checksIn,
  judgingBy,
} from "akasha/checks/modules/checking/checking.module.code.ts"
import {
  askedAnswer,
  brokenBy,
  judgedOver,
  type Keeping,
} from "akasha/commands/modules/audit-answering/audit-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refusalsPut } from "akasha/commands/modules/refusals-keeping/refusals-keeping.module.code.ts"
import { agentPathOf } from "akasha/domains/context/modules/warranting/warranting.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { requireEnv } from "akasha/utils/narrow/require-env/require-env.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"

const CHECK = "--check"

const FILE_PATH = "--file-path"

const AUDIT = "audit"

export type Meant = {
  readonly only: readonly string[]
  readonly paths: readonly string[]
  readonly refusal: string | null
}

export type Narrowed = {
  readonly checks: readonly Gathered[]
  readonly refusals: readonly string[]
}

export type Over = {
  readonly change: Change
  readonly refusals: readonly string[]
}

function heldFor(one: string, only: string[], paths: string[]): string[] | null {
  if (one === CHECK) return only
  if (one === FILE_PATH) return paths
  return null
}

export function meaning(argv: readonly string[]): Meant {
  const refused = (said: string): Meant => ({ only: [], paths: [], refusal: said })
  const only: string[] = []
  const paths: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at] ?? ""
    const held = heldFor(one, only, paths)
    if (held === null) {
      return refused(
        `\`${one}\` is not an argument this takes — \`${CHECK} <slug>\` narrows which checks ` +
          `run and \`${FILE_PATH} <path>\` narrows which files they see`
      )
    }
    const value = argv[at + 1]
    if (value === undefined) {
      return refused(
        `${one} names ${one === CHECK ? "a check" : "a path"}, and nothing followed it`
      )
    }
    if (held.includes(value)) return refused(`\`${value}\` is named more than once`)
    held.push(value)
    at += 1
  }
  return { only, paths, refusal: null }
}

export function narrowedTo(
  every: readonly Gathered[],
  atAudit: readonly Gathered[],
  named: readonly string[]
): Narrowed {
  if (named.length === 0) return { checks: atAudit, refusals: [] }
  const bySlug = new Map(every.map((one) => [one.slug, one]))
  const checks: Gathered[] = []
  const refusals: string[] = []
  for (const one of named) {
    const found = bySlug.get(one)
    if (found === undefined) {
      refusals.push(
        `\`${one}\` is no check the index names — those it names are ` +
          `\`${every.map((two) => two.slug).join("`, `")}\``
      )
      continue
    }
    checks.push(found)
  }
  return { checks, refusals }
}

export function underOf(named: readonly string[], one: string): readonly string[] {
  const held = one.endsWith("/") ? one.slice(0, -1) : one
  if (named.includes(held)) return [held]
  return named.filter((two) => two.startsWith(`${held}/`))
}

export function narrowedOver(change: Change, paths: readonly string[]): Over {
  if (paths.length === 0) return { change, refusals: [] }
  const refusals: string[] = []
  const held = new Set<string>()
  for (const one of paths) {
    const found = underOf(change.changed, one)
    if (found.length === 0) {
      refusals.push(`\`${one}\` is no file this repository holds, and no folder holding one`)
      continue
    }
    for (const two of found) held.add(two)
  }
  return { change: { ...change, changed: [...held].sort() }, refusals }
}

export function whollyFor(paths: readonly string[], root: string): string | null {
  return paths.length === 0 ? root : null
}

export function leftOutOf(atAudit: readonly Gathered[], ran: readonly Gathered[]): number {
  const slugs = new Set(ran.map((one) => one.slug))
  return atAudit.filter((one) => !slugs.has(one.slug)).length
}

export function notAnAuditIn(leftOut: number, judged: number, named: number): readonly string[] {
  const said: string[] = []
  if (leftOut > 0) said.push(`the ${counted(leftOut, "check")} it left out judged nothing`)
  if (judged < named) {
    said.push(`it judged ${counted(judged, "file")} rather than every file this repository holds`)
  }
  if (said.length === 0) return []
  return [`this is not an audit — ${said.join(", and ")}`]
}

export function notYetJudgingIn(
  every: readonly Gathered[],
  named: readonly string[]
): readonly string[] {
  if (named.length > 0) return []
  const held = every.filter((one) => one.runsOn.length === 0).length
  if (held === 0) return []
  return [`this answer leaves out ${counted(held, "check")} not yet judging`]
}

export async function askedOver(
  root: string,
  every: readonly Gathered[],
  keeping: Keeping | null
): Promise<Answer> {
  const checks = checksAt(every, AUDIT).map((one) => one.slug)
  try {
    const commit = await commitOf(root)
    const told = await asked({ root, home: requireEnv("HOME"), checks, commit })
    const also = notYetJudgingIn(every, [])
    return askedAnswer({ told, checks: checks.length, commit, also }, keeping)
  } catch (thrown) {
    return brokenBy(thrown)
  }
}

export async function audit(argv: readonly string[], given: Given): Promise<Answer> {
  const meant = meaning(argv)
  if (meant.refusal !== null) return { report: [], refusals: [meant.refusal], code: 1 }
  const root = resolve(given.root)
  const page = given.agentId === null ? null : agentPathOf(root, given.agentId)
  const keeping: Keeping | null = page === null ? null : (whole) => refusalsPut(root, page, whole)
  let every: readonly Gathered[]
  try {
    every = checksIn(root)
  } catch (thrown) {
    return brokenBy(thrown)
  }
  if (meant.only.length === 0 && meant.paths.length === 0) {
    return await askedOver(root, every, keeping)
  }
  let change: Change
  try {
    change = everythingIn(root)
  } catch (thrown) {
    return brokenBy(thrown)
  }
  const atAudit = checksAt(every, AUDIT)
  const narrowed = narrowedTo(every, atAudit, meant.only)
  const over = narrowedOver(change, meant.paths)
  const refusals = [...narrowed.refusals, ...over.refusals]
  if (refusals.length > 0) return { report: [], refusals, code: 1 }
  const also = [
    ...notAnAuditIn(
      leftOutOf(atAudit, narrowed.checks),
      over.change.changed.length,
      change.changed.length
    ),
    ...notYetJudgingIn(every, meant.only),
  ]
  const wholly = whollyFor(meant.paths, root)
  return await judgedOver(judgingBy(narrowed.checks, AUDIT, wholly), over.change, also, keeping)
}
