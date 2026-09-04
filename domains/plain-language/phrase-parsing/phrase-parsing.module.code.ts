export type Rule = {
  readonly left: string
  readonly right: readonly string[]
}

export type Grammar = {
  readonly rules: readonly Rule[]
  readonly start: string
  readonly byLeft: ReadonlyMap<string, readonly Rule[]>
  readonly named: ReadonlySet<string>
}

export type Reading = readonly (readonly string[])[]

export type Parsed = {
  readonly plain: boolean
  readonly stoppedAt: number
}

type State = {
  readonly rule: Rule
  readonly dot: number
  readonly from: number
}

export function grammarOf(said: readonly string[], start: string): Grammar {
  const rules: Rule[] = []
  for (const line of said) {
    const sides = line.split("->")
    const left = (sides[0] ?? "").trim()
    if (left === "" || sides.length < 2) continue
    for (const one of (sides[1] ?? "").split("|")) {
      const right = one
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "")
      if (right.length > 0) rules.push({ left, right })
    }
  }
  const byLeft = new Map<string, Rule[]>()
  for (const rule of rules) {
    const held = byLeft.get(rule.left) ?? []
    held.push(rule)
    byLeft.set(rule.left, held)
  }
  return { rules, start, byLeft, named: new Set(rules.map((rule) => rule.left)) }
}

function keyOf(state: State): string {
  return `${state.rule.left}>${state.rule.right.join(" ")}@${state.dot}:${state.from}`
}

export function parsed(grammar: Grammar, reading: Reading): Parsed {
  const n = reading.length
  const chart: State[][] = Array.from({ length: n + 1 }, () => [])
  const seen: Set<string>[] = Array.from({ length: n + 1 }, () => new Set<string>())

  const push = (at: number, state: State): undefined => {
    const held = seen[at]
    const row = chart[at]
    if (held === undefined || row === undefined) return undefined
    const key = keyOf(state)
    if (held.has(key)) return undefined
    held.add(key)
    row.push(state)
    return undefined
  }

  for (const rule of grammar.byLeft.get(grammar.start) ?? []) push(0, { rule, dot: 0, from: 0 })

  for (let at = 0; at <= n; at += 1) {
    const row = chart[at]
    if (row === undefined) continue
    for (let i = 0; i < row.length; i += 1) {
      const state = row[i]
      if (state === undefined) continue
      const next = state.rule.right[state.dot]
      if (next === undefined) {
        const back = chart[state.from]
        if (back === undefined) continue
        for (const one of back) {
          if (one.rule.right[one.dot] !== state.rule.left) continue
          push(at, { rule: one.rule, dot: one.dot + 1, from: one.from })
        }
        continue
      }
      if (grammar.named.has(next)) {
        for (const rule of grammar.byLeft.get(next) ?? []) push(at, { rule, dot: 0, from: at })
        continue
      }
      if (reading[at]?.includes(next) === true) {
        push(at + 1, { rule: state.rule, dot: state.dot + 1, from: state.from })
      }
    }
  }

  let stoppedAt = 0
  for (let at = 0; at <= n; at += 1) if ((chart[at]?.length ?? 0) > 0) stoppedAt = at
  const last = chart[n] ?? []
  const plain = last.some(
    (one) => one.from === 0 && one.dot === one.rule.right.length && one.rule.left === grammar.start
  )
  return { plain, stoppedAt }
}
