import { requestPut } from "akasha/check/modules/audit-request/audit-request.module.code.ts"
import {
  atOrAfter,
  type Verdict,
  verdictLogged,
} from "akasha/check/modules/audit-verdict/audit-verdict.module.code.ts"
import { checkPagesIn } from "akasha/check/modules/checking/checking.module.code.ts"
import { endingOf, ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

const UNIT = "audit-running.service"

const ROUNDS = 2

const AUDIT_LOGS = "audit.logs"

export type Verdicts = ReadonlyMap<string, Verdict>

export type Reading = () => Verdicts

export type Round = () => string | null

const round: Round = () => {
  const done = ran(["systemctl", "--user", "start", UNIT])
  if (done.code === 0) return null
  return `\`${UNIT}\` ${endingOf(done.code, done.signal)} — ${done.err.trim()}`
}

export type Asking = {
  readonly root: string
  readonly home: string
  readonly checks: readonly string[]
  readonly commit: string
  readonly round?: Round
  readonly done?: string[]
  readonly verdicts?: Reading
}

export type Told = {
  readonly refusals: readonly string[]
  readonly unrun: readonly string[]
  readonly unanswered: readonly string[]
  readonly broken: string | null
}

function pagesIn(root: string): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const path of checkPagesIn(root)) {
    const slug = partedIn(path)?.slug
    if (slug !== undefined) found.set(slug, path)
  }
  return found
}

function verdictsFor(root: string, checks: readonly string[]): Verdicts {
  const pages = pagesIn(root)
  const found = new Map<string, Verdict>()
  for (const one of checks) {
    const page = pages.get(one)
    const said = page === undefined ? null : verdictLogged(root, page, AUDIT_LOGS)
    if (said !== null) found.set(one, said)
  }
  return found
}

async function unansweredIn(
  root: string,
  verdicts: Verdicts,
  checks: readonly string[],
  commit: string
): Promise<readonly string[]> {
  const left: string[] = []
  for (const one of checks) {
    const held = verdicts.get(one)
    if (held === undefined || !(await atOrAfter(root, commit, held.commit))) left.push(one)
  }
  return left
}

export function refusalsIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.flatMap((one) => {
    const held = verdicts.get(one)
    if (held === undefined) return []
    return held.refusals.map((two) => `${one} at ${held.commit} — ${two}`)
  })
}

export function unrunIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.filter((one) => verdicts.get(one)?.unrun === true)
}

function requesting(home: string, checks: readonly string[]): string | null {
  for (const one of checks) {
    const why = requestPut(home, one)
    if (why !== null) return why
  }
  return null
}

export async function asked(given: Asking): Promise<Told> {
  const start = given.round ?? round
  const done = given.done ?? []
  const reading = given.verdicts ?? ((): Verdicts => verdictsFor(given.root, given.checks))
  const owed = async (): Promise<readonly string[]> =>
    await unansweredIn(given.root, reading(), given.checks, given.commit)
  let broken: string | null = null
  let left = await owed()
  for (let turn = 0; turn < ROUNDS && left.length > 0; turn += 1) {
    broken = requesting(given.home, left) ?? start()
    if (broken !== null) break
    done.push(left.join(", "))
    left = await owed()
  }
  const verdicts = reading()
  const answered = given.checks.filter((one) => !left.includes(one))
  return {
    refusals: refusalsIn(verdicts, answered),
    unrun: unrunIn(verdicts, answered),
    unanswered: left,
    broken,
  }
}
