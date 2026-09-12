import { requestPut } from "akasha/checks/modules/audit-request/audit-request.module.code.ts"
import {
  atOrAfter,
  type Verdicts,
  verdictsRead,
} from "akasha/checks/modules/audit-verdict/audit-verdict.module.code.ts"
import { endingOf, ran } from "akasha/utils/run/running/running.module.code.ts"

const UNIT = "audit-running.service"

const ROUNDS = 2

export type Round = () => string | null

export const round: Round = () => {
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
}

export type Told = {
  readonly refusals: readonly string[]
  readonly unrun: readonly string[]
  readonly unanswered: readonly string[]
  readonly broken: string | null
}

async function unansweredIn(
  root: string,
  verdicts: Verdicts,
  checks: readonly string[],
  commit: string
): Promise<readonly string[]> {
  const left: string[] = []
  for (const one of checks) {
    const held = verdicts[one]
    if (held === undefined || !(await atOrAfter(root, commit, held.commit))) left.push(one)
  }
  return left
}

export function refusalsIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.flatMap((one) => (verdicts[one]?.refusals ?? []).map((two) => `${one} — ${two}`))
}

export function unrunIn(verdicts: Verdicts, checks: readonly string[]): readonly string[] {
  return checks.filter((one) => verdicts[one]?.unrun === true)
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
  let broken: string | null = null
  let left = await unansweredIn(given.root, verdictsRead(given.home), given.checks, given.commit)
  for (let turn = 0; turn < ROUNDS && left.length > 0; turn += 1) {
    broken = requesting(given.home, left) ?? start()
    if (broken !== null) break
    done.push(left.join(", "))
    left = await unansweredIn(given.root, verdictsRead(given.home), given.checks, given.commit)
  }
  const verdicts = verdictsRead(given.home)
  const answered = given.checks.filter((one) => !left.includes(one))
  return {
    refusals: refusalsIn(verdicts, answered),
    unrun: unrunIn(verdicts, answered),
    unanswered: left,
    broken,
  }
}
