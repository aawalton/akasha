const NOTED_MS = 100

const NAMED_AT_MOST = 8

const LANDINGS_KEPT = 16

const SHORT_COMMIT = 8

type Span = {
  readonly name: string
  readonly began: number
  ended: number
}

type Phase = {
  readonly name: string
  readonly began: number
  readonly ms: number
}

type Landing = {
  readonly name: string
  readonly began: number
  ended: number
  commit: string | null
  readonly phases: Phase[]
}

let watched = false

const open = new Set<Span>()

let ended: Span[] = []

let landing: Landing | null = null

const LANDINGS: Landing[] = []

export function watching(on = true): undefined {
  watched = on
  open.clear()
  ended = []
  landing = null
  LANDINGS.length = 0
  return undefined
}

function spent(span: { readonly began: number; readonly ended: number }): number {
  return span.ended - span.began
}

function closed(span: Span, leastMs: number | null, into: Landing | null): undefined {
  span.ended = performance.now()
  open.delete(span)
  const ms = spent(span)
  if (ms >= NOTED_MS) ended.push(span)
  if (leastMs !== null && into !== null && ms >= leastMs) {
    into.phases.push({ name: span.name, began: span.began, ms })
  }
  return undefined
}

function thenable(done: unknown): done is PromiseLike<unknown> {
  return (
    typeof done === "object" &&
    done !== null &&
    typeof (done as { readonly then?: unknown }).then === "function"
  )
}

function spanned<T>(name: string, act: () => T, leastMs: number | null): T {
  if (!watched) return act()
  const span: Span = { name, began: performance.now(), ended: Number.NaN }
  const into = landing
  open.add(span)
  let done: T
  try {
    done = act()
  } catch (thrown) {
    closed(span, leastMs, into)
    throw thrown
  }
  if (!thenable(done)) {
    closed(span, leastMs, into)
    return done
  }
  const shut = (): undefined => closed(span, leastMs, into)
  done.then(shut, shut)
  return done
}

export function marked<T>(name: string, act: () => T): T {
  return spanned(name, act, null)
}

export function phased<T>(name: string, act: () => T, leastMs = 0): T {
  return spanned(name, act, leastMs)
}

export async function landingMarked<T>(
  name: string,
  act: () => Promise<T>,
  commitOf: (done: T) => string | null
): Promise<T> {
  if (!watched) return await act()
  const one: Landing = {
    name,
    began: performance.now(),
    ended: Number.NaN,
    commit: null,
    phases: [],
  }
  landing = one
  try {
    const done = await marked(name, act)
    one.commit = commitOf(done)
    return done
  } finally {
    one.ended = performance.now()
    if (landing === one) landing = null
    LANDINGS.push(one)
    if (LANDINGS.length > LANDINGS_KEPT) LANDINGS.shift()
  }
}

function landingSaid(one: Landing): string {
  const commit = one.commit === null ? "no commit" : one.commit.slice(0, SHORT_COMMIT)
  const phases = [...one.phases]
    .sort((a, b) => a.began - b.began)
    .map((phase) => `${phase.name} ${Math.round(phase.ms)} ms`)
  return `${one.name} to ${commit} took ${Math.round(spent(one))} ms (${phases.join(", ")})`
}

export function landingsSaid(from: number, to: number): string {
  const within = LANDINGS.filter((one) => one.ended >= from && one.began <= to)
  return within.map(landingSaid).join("; ")
}

type Named = { readonly name: string; count: number; ms: number }

function gathered(spans: readonly Span[], to: number): readonly Named[] {
  const byName = new Map<string, Named>()
  for (const one of spans) {
    const ms = (Number.isNaN(one.ended) ? to : one.ended) - one.began
    const had = byName.get(one.name)
    if (had === undefined) byName.set(one.name, { name: one.name, count: 1, ms })
    else {
      had.count += 1
      had.ms = Math.max(had.ms, ms)
    }
  }
  return [...byName.values()].sort((a, b) => b.ms - a.ms)
}

function namedSaid(one: Named, running: boolean): string {
  const times = one.count === 1 ? "" : `${one.count}x `
  const upTo = one.count === 1 ? "" : "up to "
  return `${times}${one.name} ${upTo}${Math.round(one.ms)} ms${running ? " so far" : ""}`
}

export function heldSaid(from: number, to: number): string {
  const done = ended.filter((one) => one.ended >= from && one.began <= to)
  const said = [
    ...gathered(done, to).map((one) => namedSaid(one, false)),
    ...gathered([...open], to).map((one) => namedSaid(one, true)),
  ]
  if (said.length === 0) return "nothing named ran"
  const shown = said.slice(0, NAMED_AT_MOST)
  const more = said.length - shown.length
  return more > 0 ? `${shown.join(", ")} and ${more} more` : shown.join(", ")
}

export function forgotten(before: number): undefined {
  ended = ended.filter((one) => one.ended >= before)
  return undefined
}
