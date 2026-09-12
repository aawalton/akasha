import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { counted } from "akasha/utils/text/modules/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export type SaidAs = "flag" | "word" | "flag-or-word"

export type Naming = {
  readonly argument: Argument
  readonly required?: boolean
  readonly repeats?: boolean
  readonly saidAs?: SaidAs
  readonly notWith?: readonly Argument[]
  readonly oneOf?: readonly Argument[]
  readonly default?: string
}

export type Value = string | number | boolean | readonly (string | number)[]

export type Taken = Readonly<Record<string, Value>>

export type Read<Answered = Taken> =
  | { readonly taken: Answered }
  | { readonly refused: readonly string[] }

const WHOLE = /^\d+$/

const FLAG = "--"

const EQUALS = "="

function spelledAsAFlag(word: string): boolean {
  return word.startsWith(FLAG)
}

function carries(argument: Argument): boolean {
  return argument.value !== "none"
}

function repeating(one: Naming): boolean {
  return one.repeats === true
}

function atAFlag(one: Naming): boolean {
  return one.saidAs !== "word"
}

function asAWord(one: Naming): boolean {
  return one.saidAs === "word" || one.saidAs === "flag-or-word"
}

function spelt(one: Naming, byWord: boolean): string {
  return byWord ? `<${one.argument.placeholder ?? one.argument.slug}>` : one.argument.said
}

function spellingsOf(one: Naming): readonly string[] {
  const every: string[] = []
  if (asAWord(one)) every.push(spelt(one, true))
  if (atAFlag(one)) every.push(spelt(one, false))
  return every
}

function eitherWay(one: Naming): string {
  return namesDrawn(spellingsOf(one), " or ")
}

function whyRefused(one: Naming, said: string, byWord: boolean): string | null {
  const value = one.argument.value
  if (value === "whole-number") {
    if (!WHOLE.test(said)) {
      return `\`${spelt(one, byWord)} ${said}\` is no whole number of nought or more`
    }
    if (!Number.isSafeInteger(Number(said))) {
      return `\`${spelt(one, byWord)} ${said}\` is past the largest whole number that can be read`
    }
  }
  if (value === "true-or-false" && said !== "true" && said !== "false") {
    return `\`${spelt(one, byWord)}\` takes \`true\` or \`false\`, and \`${said}\` is neither`
  }
  return null
}

function heldOf(argument: Argument, said: string | null): string | number | boolean {
  if (said === null) return true
  if (argument.value === "whole-number") return Number(said)
  if (argument.value === "true-or-false") return said === "true"
  return said
}

function unknown(word: string, calledAs: string, every: readonly string[]): string {
  return every.length === 0
    ? `\`${word}\` is no argument \`${calledAs}\` takes, and it takes none`
    : `\`${word}\` is no argument \`${calledAs}\` takes — it takes \`${every.join("`, `")}\``
}

function saidAgain(one: Naming, byWord: boolean, wasWord: boolean): string {
  if (byWord === wasWord) {
    return `\`${spelt(one, byWord)}\` is said twice, and one call says it once`
  }
  return `\`${spelt(one, true)}\` is said as a word and \`${spelt(one, false)}\` at its flag, and one call says it one way`
}

function tooManyWords(calledAs: string, takes: number, spare: readonly string[]): string {
  const taking = counted(takes, "word")
  const said = counted(takes + spare.length, "word")
  return `\`${calledAs}\` takes ${taking} and this call says ${said} — nothing takes ${namesDrawn(spare, " or ")}`
}

type Filling = {
  readonly taken: Record<string, Value>
  readonly heard: Set<string>
  readonly asWord: Set<string>
  readonly refusals: string[]
}

function filling(state: Filling, one: Naming, value: string | null, byWord: boolean): undefined {
  const argument = one.argument
  const slug = argument.slug
  const key = exportedAs(slug)
  const why = value === null ? null : whyRefused(one, value, byWord)
  if (why !== null) {
    state.refusals.push(why)
    state.heard.add(slug)
    if (byWord) state.asWord.add(slug)
    return
  }
  if (repeating(one)) {
    const before = (state.taken[key] ?? []) as readonly (string | number)[]
    state.taken[key] = [...before, heldOf(argument, value) as string | number]
  } else if (state.heard.has(slug)) {
    state.refusals.push(saidAgain(one, byWord, state.asWord.has(slug)))
    return
  } else {
    state.taken[key] = heldOf(argument, value)
  }
  state.heard.add(slug)
  if (byWord) state.asWord.add(slug)
}

function fighting(state: Filling, naming: readonly Naming[]): undefined {
  const bySlug = new Map(naming.map((one) => [one.argument.slug, one]))
  const paired = new Set<string>()
  for (const one of naming) {
    const slug = one.argument.slug
    if (!state.heard.has(slug)) continue
    for (const other of one.notWith ?? []) {
      if (!state.heard.has(other.slug)) continue
      const pair = [slug, other.slug].sort().join(" ")
      if (paired.has(pair)) continue
      paired.add(pair)
      const held = bySlug.get(other.slug)
      const said = held === undefined ? other.said : spelt(held, state.asWord.has(other.slug))
      state.refusals.push(
        `\`${spelt(one, state.asWord.has(slug))}\` and \`${said}\` are never said together, and this call says both`
      )
    }
  }
}

function grouped(naming: readonly Naming[]): readonly (readonly Naming[])[] {
  let groups: Set<string>[] = []
  for (const one of naming) {
    const named = one.oneOf ?? []
    if (named.length === 0) continue
    const slugs = new Set([one.argument.slug, ...named.map((other) => other.slug)])
    const touching = groups.filter((group) => [...group].some((slug) => slugs.has(slug)))
    for (const group of touching) for (const slug of group) slugs.add(slug)
    groups = groups.filter((group) => !touching.includes(group))
    groups.push(slugs)
  }
  return groups.map((group) => naming.filter((one) => group.has(one.argument.slug)))
}

function saidNone(calledAs: string, group: readonly Naming[]): string {
  const every = group.flatMap((one) => spellingsOf(one))
  const last = every[every.length - 1] ?? ""
  const before = every.slice(0, -1)
  const said =
    before.length === 0 ? namesDrawn([last]) : `${namesDrawn(before)} or ${namesDrawn([last])}`
  const naught = every.length > 2 ? "and nothing said any of them" : "and nothing said either"
  return `\`${calledAs}\` takes ${said}, ${naught}`
}

function lacking(state: Filling, calledAs: string, naming: readonly Naming[]): undefined {
  for (const group of grouped(naming)) {
    if (group.some((one) => state.heard.has(one.argument.slug))) continue
    state.refusals.push(saidNone(calledAs, group))
  }
}

export function takingIn(
  argv: readonly string[],
  calledAs: string,
  naming: readonly Naming[]
): Read {
  const state: Filling = { taken: {}, heard: new Set(), asWord: new Set(), refusals: [] }
  const atFlags = naming.filter((one) => atAFlag(one))
  const bySaid = new Map(atFlags.map((one) => [one.argument.said, one]))
  const spellings = naming.flatMap((one) => spellingsOf(one))
  const forWords = naming.filter((one) => asAWord(one))
  let atWord = 0
  const spare: string[] = []
  let wordsOnly = false
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    if (!wordsOnly && word === FLAG) {
      wordsOnly = true
      continue
    }
    const equals = wordsOnly || !spelledAsAFlag(word) ? -1 : word.indexOf(EQUALS)
    const named = equals > FLAG.length ? word.slice(0, equals) : word
    const inline = equals > FLAG.length ? word.slice(equals + 1) : undefined
    const held = wordsOnly ? undefined : bySaid.get(named)
    if (held === undefined) {
      if (forWords.length === 0 || (!wordsOnly && spelledAsAFlag(word))) {
        state.refusals.push(unknown(word, calledAs, spellings))
        continue
      }
      const takingIt = forWords[atWord]
      if (takingIt === undefined) {
        spare.push(word)
        continue
      }
      if (word === "") {
        state.refusals.push(
          `\`${calledAs}\` takes ${eitherWay(takingIt)}, and an empty word names none`
        )
        continue
      }
      filling(state, takingIt, word, true)
      if (!repeating(takingIt)) atWord += 1
      continue
    }
    const argument = held.argument
    if (!carries(argument)) {
      if (inline !== undefined) {
        state.refusals.push(`\`${named}\` carries no value, and \`${word}\` names one`)
        continue
      }
      filling(state, held, null, false)
      continue
    }
    if (inline !== undefined) {
      if (inline === "") {
        state.refusals.push(`\`${named}\` takes a value, and \`${word}\` names none`)
        continue
      }
      filling(state, held, inline, false)
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || bySaid.has(next) || spelledAsAFlag(next)) {
      state.refusals.push(`\`${word}\` takes a value, and none follows it`)
      continue
    }
    at += 1
    if (next === "") {
      state.refusals.push(`\`${word}\` takes a value, and the empty word after it names none`)
      continue
    }
    filling(state, held, next, false)
  }
  if (spare.length > 0) {
    state.refusals.push(tooManyWords(calledAs, forWords.length, spare))
  }
  for (const one of naming) {
    if (one.required !== true || state.heard.has(one.argument.slug)) continue
    state.refusals.push(`\`${calledAs}\` takes ${eitherWay(one)}, and nothing said it`)
  }
  fighting(state, naming)
  lacking(state, calledAs, naming)
  if (state.refusals.length > 0) return { refused: state.refusals }
  for (const one of naming) {
    const key = exportedAs(one.argument.slug)
    if (key in state.taken) continue
    const byDefault = one.default ?? one.argument.default
    if (!carries(one.argument)) state.taken[key] = false
    else if (repeating(one)) state.taken[key] = []
    else if (byDefault !== undefined) state.taken[key] = heldOf(one.argument, byDefault)
  }
  return { taken: state.taken }
}
