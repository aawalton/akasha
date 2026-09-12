import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"

export type SaidAs = "flag" | "word" | "flag-or-word"

export type Naming = {
  readonly argument: Argument
  readonly required?: boolean
  readonly saidAs?: SaidAs
  readonly notWith?: readonly Argument[]
}

export type Value = string | number | boolean | readonly (string | number)[]

export type Taken = Readonly<Record<string, Value>>

export type Read = { readonly taken: Taken } | { readonly refused: readonly string[] }

const WHOLE = /^\d+$/

function carries(argument: Argument): boolean {
  return argument.value !== "none"
}

function atAFlag(one: Naming): boolean {
  return one.saidAs !== "word"
}

function asAWord(one: Naming): boolean {
  return one.saidAs === "word" || one.saidAs === "flag-or-word"
}

function spelt(one: Naming): string {
  return atAFlag(one) ? one.argument.said : `<${one.argument.placeholder ?? one.argument.slug}>`
}

function whyRefused(one: Naming, said: string): string | null {
  const value = one.argument.value
  if (value === "whole-number" && !WHOLE.test(said)) {
    return `\`${spelt(one)} ${said}\` is no whole number of nought or more`
  }
  if (value === "true-or-false" && said !== "true" && said !== "false") {
    return `\`${spelt(one)}\` takes \`true\` or \`false\`, and \`${said}\` is neither`
  }
  return null
}

function heldOf(argument: Argument, said: string): string | number | boolean {
  if (argument.value === "whole-number") return Number(said)
  if (argument.value === "true-or-false") return said === "true"
  return said
}

function unknown(word: string, calledAs: string, every: readonly string[]): string {
  return every.length === 0
    ? `\`${word}\` is no argument \`${calledAs}\` takes, and it takes none`
    : `\`${word}\` is no argument \`${calledAs}\` takes — it takes \`${every.join("`, `")}\``
}

function saidAgain(said: string, byWord: boolean, wasWord: boolean): string {
  return byWord === wasWord
    ? `\`${said}\` is said twice, and one call says it once`
    : `\`${said}\` is said as a word and at its flag, and one call says it one way`
}

type Filling = {
  readonly taken: Record<string, Value>
  readonly heard: Set<string>
  readonly asWord: Set<string>
  readonly refusals: string[]
}

function filling(state: Filling, one: Naming, value: string, byWord: boolean): undefined {
  const why = whyRefused(one, value)
  if (why !== null) {
    state.refusals.push(why)
    return
  }
  const argument = one.argument
  const slug = argument.slug
  const key = exportedAs(slug)
  if (argument.repeats === true) {
    const before = (state.taken[key] ?? []) as readonly (string | number)[]
    state.taken[key] = [...before, heldOf(argument, value) as string | number]
  } else if (state.heard.has(slug)) {
    state.refusals.push(saidAgain(spelt(one), byWord, state.asWord.has(slug)))
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
      state.refusals.push(
        `\`${spelt(one)}\` and \`${held === undefined ? other.said : spelt(held)}\` are never said together, and this call says both`
      )
    }
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
  const spellings = naming.map((one) => spelt(one))
  const forWords = naming.find((one) => asAWord(one))
  for (let at = 0; at < argv.length; at += 1) {
    const word = argv[at]
    if (word === undefined) continue
    const held = bySaid.get(word)
    if (held === undefined) {
      if (forWords === undefined || word.startsWith("--")) {
        state.refusals.push(unknown(word, calledAs, spellings))
        continue
      }
      filling(state, forWords, word, true)
      continue
    }
    const argument = held.argument
    if (!carries(argument)) {
      state.taken[exportedAs(argument.slug)] = true
      state.heard.add(argument.slug)
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || bySaid.has(next)) {
      state.refusals.push(`\`${word}\` takes a value, and none follows it`)
      continue
    }
    at += 1
    filling(state, held, next, false)
  }
  for (const one of naming) {
    if (one.required !== true || state.heard.has(one.argument.slug)) continue
    state.refusals.push(`\`${calledAs}\` takes \`${spelt(one)}\`, and nothing said it`)
  }
  fighting(state, naming)
  if (state.refusals.length > 0) return { refused: state.refusals }
  for (const one of naming) {
    const key = exportedAs(one.argument.slug)
    if (key in state.taken) continue
    if (!carries(one.argument)) state.taken[key] = false
    else if (one.argument.repeats === true) state.taken[key] = []
  }
  return { taken: state.taken }
}
