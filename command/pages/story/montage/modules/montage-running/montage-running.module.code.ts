import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Added } from "akasha/command/pages/story/modules/settle-asking/settle-asking.module.code.ts"

export const MOST_SESSIONS = 366

const MINUTE = 60_000

const ENDS_AT = "endsAt"

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

export type Checked = {
  readonly check: string
  readonly reading: Readonly<Record<string, unknown>>
  readonly dice: string | null
}

export type Bounds = {
  readonly sessions: number | null
  readonly until: string | null
  readonly crossing: string | null
}

export type Montage = {
  readonly time: string
  readonly activity: Checked
  readonly upkeep: Checked | null
  readonly from: string
  readonly every: number
  readonly bounds: Bounds
  readonly interruptsAt: string | null
  readonly before: string | null
  readonly place: number
}

export type Cast = { readonly stated: Readonly<Record<string, unknown>>; readonly roll: unknown }

export type Answer = { readonly answered: unknown; readonly added: readonly Added[] }

export type Next = {
  readonly reading: Readonly<Record<string, unknown>>
  readonly crossed: readonly string[]
  readonly left: string | null
}

export type Rules = {
  readonly cast: (before: string | null, place: number, dice: string) => Held<Cast>
  readonly settle: (check: string, reading: unknown, roll: unknown) => Promise<Held<Answer>>
  readonly next: (check: string, reading: unknown, answered: unknown) => Held<Next>
}

export type Line = Readonly<Record<string, unknown>>

export type Session = {
  readonly session: number
  readonly from: string
  readonly endsAt: string
  readonly crossed: readonly string[]
  readonly left: string | null
}

export type Stop = "sessions" | "until" | "crossing" | "interrupted" | "left" | "refused" | "most"

export type Ran = {
  readonly lines: readonly Line[]
  readonly added: readonly Added[]
  readonly sessions: readonly Session[]
  readonly endsAt: string
  readonly stopped: Stop
  readonly why: string
}

type Chain = { readonly before: string | null; readonly place: number }

type Settled = { readonly line: Line; readonly answer: Answer }

type Running = {
  readonly lines: Line[]
  readonly added: Added[]
  readonly sessions: Session[]
  chain: Chain
  from: string
  activity: Checked
  upkeep: Checked | null
}

type Timed = { readonly line: Line; readonly endsAt: string }

type Step = { readonly done: Held<Ran> } | { readonly session: Session }

function chained(chain: Chain, line: Line): Chain {
  return { before: JSON.stringify(line), place: chain.place + 1 }
}

async function settledFor(
  rules: Rules,
  checked: Checked,
  session: number,
  chain: Chain
): Promise<Held<Settled>> {
  const cast = checked.dice === null ? null : rules.cast(chain.before, chain.place, checked.dice)
  if (cast !== null && "refused" in cast) return cast
  const thrown = cast === null ? null : cast.answered
  const said = await rules.settle(checked.check, checked.reading, thrown?.roll ?? null)
  if ("refused" in said) return said
  const line: Line = {
    check: checked.check,
    reading: checked.reading,
    session,
    ...(thrown?.stated ?? {}),
    answered: said.answered.answered,
  }
  return { answered: { line, answer: said.answered } }
}

function endsAtOf(line: Line): string | null {
  const answered = line["answered"]
  if (!isRecord(answered)) return null
  const ends = answered[ENDS_AT]
  return typeof ends === "string" ? ends : null
}

async function timeFor(
  montage: Montage,
  rules: Rules,
  running: Running,
  session: number,
  minutes: number
): Promise<Held<Timed>> {
  const reading = { from: running.from, minutes }
  const timed = { check: montage.time, reading, dice: null }
  const settled = await settledFor(rules, timed, session, running.chain)
  if ("refused" in settled) return settled
  const endsAt = endsAtOf(settled.answered.line)
  if (endsAt === null) return { refused: `\`${montage.time}\` answered no \`${ENDS_AT}\`` }
  return { answered: { line: settled.answered.line, endsAt } }
}

function ran(running: Running, stopped: Stop, why: string): Held<Ran> {
  const { lines, added, sessions, from } = running
  return { answered: { lines, added, sessions, endsAt: from, stopped, why } }
}

async function interrupted(
  montage: Montage,
  rules: Rules,
  running: Running,
  session: number,
  at: string
): Promise<Held<Ran>> {
  const minutes = Math.floor((Date.parse(at) - Date.parse(running.from)) / MINUTE)
  const why = `the world breaks in at ${at}`
  if (minutes <= 0) return ran(running, "interrupted", why)
  const passed = await timeFor(montage, rules, running, session, minutes)
  if ("refused" in passed) return passed
  running.lines.push(passed.answered.line)
  running.chain = chained(running.chain, passed.answered.line)
  running.from = passed.answered.endsAt
  return ran(running, "interrupted", why)
}

function nextOf(rules: Rules, checked: Checked, answered: unknown): Held<Next> {
  const said = rules.next(checked.check, checked.reading, answered)
  if ("refused" in said) return { refused: `\`${checked.check}\`: ${said.refused}` }
  return said
}

async function boundedTime(
  montage: Montage,
  rules: Rules,
  running: Running,
  session: number
): Promise<Held<Timed> | { readonly done: Held<Ran> }> {
  const timed = await timeFor(montage, rules, running, session, montage.every)
  if ("refused" in timed) return timed
  const ends = Date.parse(timed.answered.endsAt)
  const { interruptsAt } = montage
  if (interruptsAt !== null && ends >= Date.parse(interruptsAt)) {
    return { done: await interrupted(montage, rules, running, session, interruptsAt) }
  }
  const { until } = montage.bounds
  if (until !== null && ends > Date.parse(until)) {
    return { done: ran(running, "until", `the next session would end after ${until}`) }
  }
  return timed
}

async function sessionRun(
  montage: Montage,
  rules: Rules,
  running: Running,
  session: number
): Promise<Step> {
  const timed = await boundedTime(montage, rules, running, session)
  if ("done" in timed) return timed
  if ("refused" in timed) return { done: timed }
  let chain = chained(running.chain, timed.answered.line)
  const kept: Settled[] = []
  for (const checked of [running.upkeep, running.activity]) {
    if (checked === null) continue
    const settled = await settledFor(rules, checked, session, chain)
    if ("refused" in settled) {
      const why = `\`${checked.check}\`: ${settled.refused}`
      return { done: session === 1 ? { refused: why } : ran(running, "refused", why) }
    }
    kept.push(settled.answered)
    chain = chained(chain, settled.answered.line)
  }
  const drilled = kept.at(-1)
  const upkept = running.upkeep === null ? null : (kept[0] ?? null)
  if (drilled === undefined) return { done: { refused: "a montage has an activity" } }
  const nextActivity = nextOf(rules, running.activity, drilled.answer.answered)
  if ("refused" in nextActivity) return { done: nextActivity }
  const nextUpkeep =
    running.upkeep === null || upkept === null
      ? null
      : nextOf(rules, running.upkeep, upkept.answer.answered)
  if (nextUpkeep !== null && "refused" in nextUpkeep) return { done: nextUpkeep }
  running.lines.push(timed.answered.line, ...kept.map((each) => each.line))
  running.added.push(...kept.flatMap((each) => each.answer.added))
  running.chain = chain
  const begun = running.from
  running.from = timed.answered.endsAt
  running.activity = { ...running.activity, reading: nextActivity.answered.reading }
  if (running.upkeep !== null && nextUpkeep !== null) {
    running.upkeep = { ...running.upkeep, reading: nextUpkeep.answered.reading }
  }
  const crossed = [...nextActivity.answered.crossed, ...(nextUpkeep?.answered.crossed ?? [])]
  const left = nextActivity.answered.left ?? nextUpkeep?.answered.left ?? null
  const run = { session, from: begun, endsAt: running.from, crossed, left }
  running.sessions.push(run)
  return { session: run }
}

export async function montageRan(montage: Montage, rules: Rules): Promise<Held<Ran>> {
  const running: Running = {
    lines: [],
    added: [],
    sessions: [],
    chain: { before: montage.before, place: montage.place },
    from: montage.from,
    activity: montage.activity,
    upkeep: montage.upkeep,
  }
  const { sessions, crossing } = montage.bounds
  const most = sessions ?? MOST_SESSIONS
  for (let session = 1; session <= most; session += 1) {
    const step = await sessionRun(montage, rules, running, session)
    if ("done" in step) return step.done
    if (crossing !== null && step.session.crossed.includes(crossing)) {
      return ran(running, "crossing", `crossed ${crossing}`)
    }
    if (step.session.left !== null) return ran(running, "left", step.session.left)
  }
  if (sessions !== null) return ran(running, "sessions", `${sessions} sessions ran`)
  return ran(running, "most", `no montage runs more than ${MOST_SESSIONS} sessions`)
}
