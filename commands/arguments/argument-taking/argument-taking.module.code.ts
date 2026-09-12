import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { slugOfPart } from "akasha/commands/modules/namespace-listing/namespace-listing.module.code.ts"
import { exportedAs } from "akasha/pages/export-name/page-export-name.module.code.ts"
import { counted } from "akasha/utils/text/counted/counted.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export type SaidAs = "flag" | "word" | "flag-or-word"

export type Naming = {
  readonly argument: Argument
  readonly required?: boolean
  readonly repeats?: boolean
  readonly saidAs?: SaidAs
  readonly notWith?: readonly Argument[]
  readonly oneOf?: readonly Argument[]
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

function tooManyWords(calledAs: string, takes: number, said: number): string {
  const taking = counted(takes, "word")
  return `\`${calledAs}\` takes ${taking} and this call says ${counted(said, "word")}`
}

type Filling = {
  readonly taken: Record<string, Value>
  readonly heard: Set<string>
  readonly asWord: Set<string>
  readonly refusals: string[]
}

function filling(state: Filling, one: Naming, value: string, byWord: boolean): undefined {
  const argument = one.argument
  const slug = argument.slug
  const key = exportedAs(slug)
  const why = whyRefused(one, value)
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
  const every = group.map((one) => spelt(one))
  const last = every[every.length - 1] ?? ""
  const before = every.slice(0, -1)
  const said = before.length === 0 ? `\`${last}\`` : `${namesDrawn(before)} or \`${last}\``
  const naught = group.length > 2 ? "and nothing said any of them" : "and nothing said either"
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
  const spellings = naming.map((one) => spelt(one))
  const forWords = naming.filter((one) => asAWord(one))
  let atWord = 0
  let overflowed = 0
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
        overflowed += 1
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
      state.taken[exportedAs(argument.slug)] = true
      state.heard.add(argument.slug)
      continue
    }
    if (inline !== undefined) {
      filling(state, held, inline, false)
      continue
    }
    const next = argv[at + 1]
    if (next === undefined || bySaid.has(next) || spelledAsAFlag(next)) {
      state.refusals.push(`\`${word}\` takes a value, and none follows it`)
      continue
    }
    at += 1
    filling(state, held, next, false)
  }
  if (overflowed > 0) {
    state.refusals.push(tooManyWords(calledAs, forWords.length, forWords.length + overflowed))
  }
  for (const one of naming) {
    if (one.required !== true || state.heard.has(one.argument.slug)) continue
    state.refusals.push(`\`${calledAs}\` takes \`${spelt(one)}\`, and nothing said it`)
  }
  fighting(state, naming)
  lacking(state, calledAs, naming)
  if (state.refusals.length > 0) return { refused: state.refusals }
  for (const one of naming) {
    const key = exportedAs(one.argument.slug)
    if (key in state.taken) continue
    const byDefault = one.argument.default
    if (!carries(one.argument)) state.taken[key] = false
    else if (repeating(one)) state.taken[key] = []
    else if (byDefault !== undefined) state.taken[key] = heldOf(one.argument, byDefault)
  }
  return { taken: state.taken }
}

export type Named = {
  readonly argument: string
  readonly required?: boolean
  readonly repeats?: boolean
  readonly saidAs?: SaidAs
  readonly notWith?: readonly string[]
  readonly oneOf?: readonly string[]
}

export type Commanding = {
  readonly slug: string
  readonly arguments?: readonly Named[]
}

type Camel<Said extends string> = Said extends `${infer head}-${infer rest}`
  ? `${head}${Capitalize<Camel<rest>>}`
  : Said

type Slugged<Said extends string> = Said extends `argument/${infer slug}` ? slug : Said

type Carries<Said extends Argument["value"]> = Said extends "whole-number"
  ? number
  : Said extends "none" | "true-or-false"
    ? boolean
    : string

type Repeating<Entry extends Named> = Entry extends { readonly repeats: true } ? true : false

type Carried<Entry extends Named, Page extends Argument> =
  Repeating<Entry> extends true ? readonly Carries<Page["value"]>[] : Carries<Page["value"]>

type Entries<Page extends Commanding> = Page extends {
  readonly arguments: infer Held extends readonly Named[]
}
  ? Held[number]
  : never

type PageOf<Entry extends Named, Pages extends Argument> = Extract<
  Pages,
  { readonly slug: Slugged<Entry["argument"]> }
>

type Filled<Entry extends Named, Pages extends Argument> = Entry extends {
  readonly required: true
}
  ? true
  : PageOf<Entry, Pages> extends { readonly value: "none" }
    ? true
    : Repeating<Entry> extends true
      ? true
      : PageOf<Entry, Pages> extends { readonly default: string }
        ? true
        : false

type Unnamed<Page extends Commanding, Pages extends Argument> = Exclude<
  Slugged<Entries<Page>["argument"]>,
  Pages["slug"]
>

type Flat<Of> = { readonly [Key in keyof Of]: Of[Key] }

type HandTakenForTheArgumentPageFor<Said extends string> = { readonly missing: Said }

export type TakenFor<Page extends Commanding, Pages extends Argument> = [
  Unnamed<Page, Pages>,
] extends [never]
  ? Flat<
      {
        [Entry in Entries<Page> as Filled<Entry, Pages> extends true
          ? Camel<Slugged<Entry["argument"]>>
          : never]: Carried<Entry, PageOf<Entry, Pages>>
      } & {
        [Entry in Entries<Page> as Filled<Entry, Pages> extends true
          ? never
          : Camel<Slugged<Entry["argument"]>>]?: Carried<Entry, PageOf<Entry, Pages>>
      }
    >
  : HandTakenForTheArgumentPageFor<Unnamed<Page, Pages>>

function namedBy(entry: Named, bySlug: ReadonlyMap<string, Argument>): Naming | null {
  const argument = bySlug.get(slugOfPart(entry.argument))
  if (argument === undefined) return null
  const pagesOf = (named: readonly string[]): readonly Argument[] =>
    named.flatMap((one) => {
      const held = bySlug.get(slugOfPart(one))
      return held === undefined ? [] : [held]
    })
  const against = pagesOf(entry.notWith ?? [])
  const among = pagesOf(entry.oneOf ?? [])
  return {
    argument,
    ...(entry.required === undefined ? {} : { required: entry.required }),
    ...(entry.repeats === undefined ? {} : { repeats: entry.repeats }),
    ...(entry.saidAs === undefined ? {} : { saidAs: entry.saidAs }),
    ...(against.length === 0 ? {} : { notWith: against }),
    ...(among.length === 0 ? {} : { oneOf: among }),
  }
}

export function takenFor<Page extends Commanding, Pages extends readonly Argument[]>(
  argv: readonly string[],
  calledAs: string,
  page: Page,
  pages: Pages
): Read<TakenFor<Page, Pages[number]>> {
  const bySlug: ReadonlyMap<string, Argument> = new Map(pages.map((one) => [one.slug, one]))
  const naming: Naming[] = []
  for (const entry of page.arguments ?? []) {
    const one = namedBy(entry, bySlug)
    if (one !== null) naming.push(one)
  }
  const read = takingIn(argv, calledAs, naming)
  if ("refused" in read) return read
  return { taken: read.taken as TakenFor<Page, Pages[number]> }
}
