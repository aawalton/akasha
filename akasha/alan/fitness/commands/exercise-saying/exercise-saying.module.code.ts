import type { Answer } from "@akasha/command-system/calling"
import { getEsoDayStr } from "@akasha/day/eso-day"

export const INPUT = 1

export const DATA = 2

export const JSON_SAID = "--json"

const DAY_SHAPE = /^\d{4}-\d{2}-\d{2}$/

export type Said = {
  readonly named: Readonly<Record<string, string>>
  readonly repeated: Readonly<Record<string, readonly string[]>>
  readonly flags: ReadonlySet<string>
}

export type Refusal = { readonly refused: readonly string[] }

export type Reading<T> = T | Refusal

export type Shape = {
  readonly valued?: readonly string[]
  readonly repeats?: readonly string[]
  readonly switches?: readonly string[]
}

export function wordsIn(argv: readonly string[], shape: Shape): Reading<Said> {
  const valued = shape.valued ?? []
  const repeats = shape.repeats ?? []
  const switches = shape.switches ?? []
  const named: Record<string, string> = {}
  const repeated: Record<string, string[]> = {}
  const flags = new Set<string>()
  const refusals: string[] = []
  let at = 0
  while (at < argv.length) {
    const one = argv[at] as string
    at += 1
    if (switches.includes(one)) {
      flags.add(one)
      continue
    }
    const takesOne = valued.includes(one)
    const mayRepeat = repeats.includes(one)
    if (!takesOne && !mayRepeat) {
      refusals.push(`\`${one}\` is nothing this takes`)
      continue
    }
    const value = argv[at]
    at += 1
    if (value === undefined || value === "") {
      refusals.push(`\`${one}\` takes a value, and this call names none after it`)
      continue
    }
    if (mayRepeat) {
      const held = repeated[one] ?? []
      held.push(value)
      repeated[one] = held
      continue
    }
    if (one in named) {
      refusals.push(`\`${one}\` is named twice, so which is meant is unsettled`)
      continue
    }
    named[one] = value
  }
  if (refusals.length > 0) return { refused: refusals }
  return { named, repeated, flags }
}

export function requiredIn(said: Said, flag: string): Reading<string> {
  const value = said.named[flag]
  if (value === undefined) return { refused: [`\`${flag}\` is what this needs, and none is named`] }
  return value
}

export function dayIn(said: Said, flag: string, now: Date): Reading<string> {
  const value = said.named[flag]
  if (value === undefined) return getEsoDayStr(now)
  if (!DAY_SHAPE.test(value)) {
    return {
      refused: [`\`${flag}\` takes a day spelled YYYY-MM-DD, and this call names \`${value}\``],
    }
  }
  return value
}

export function countIn(said: Said, flag: string, fallback: number): Reading<number> {
  const value = said.named[flag]
  if (value === undefined) return fallback
  const count = Number(value)
  if (!Number.isInteger(count) || count < 0) {
    return { refused: [`\`${flag}\` takes a whole count, and this call names \`${value}\``] }
  }
  return count
}

export function decimalIn(said: Said, flag: string): Reading<number> {
  const value = said.named[flag]
  if (value === undefined) return { refused: [`\`${flag}\` is what this needs, and none is named`] }
  const found = Number(value)
  if (!Number.isFinite(found)) {
    return { refused: [`\`${flag}\` takes a number, and this call names \`${value}\``] }
  }
  return found
}

export function oneOfIn(
  said: Said,
  flag: string,
  choices: readonly string[]
): Reading<string | undefined> {
  const value = said.named[flag]
  if (value === undefined) return undefined
  const found = value.trim().toLowerCase()
  if (!choices.includes(found)) {
    return {
      refused: [
        `\`${flag}\` takes one of \`${choices.join("`, `")}\`, and this call names \`${value}\``,
      ],
    }
  }
  return found
}

export function wantsJson(said: Said): boolean {
  return said.flags.has(JSON_SAID)
}

export function refusedBy(refusals: readonly string[], code = INPUT): Answer {
  return { report: [], refusals, code }
}

export function told(lines: readonly string[]): Answer {
  return { report: lines, refusals: [], code: 0 }
}

export function asJson(value: unknown): Answer {
  return { report: [JSON.stringify(value)], refusals: [], code: 0 }
}

export function rowsOf(pairs: readonly (readonly [string, string])[]): readonly string[] {
  return pairs.map(([key, value]) => `${key}\t${value}`)
}
