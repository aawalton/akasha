import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { addedSpelling } from "akasha/command/argument/pages/added-spelling.argument.ts"
import { lexiconScope } from "akasha/command/argument/pages/lexicon-scope.argument.ts"
import { trialConstruction } from "akasha/command/argument/pages/trial-construction.argument.ts"
import { wording } from "akasha/command/argument/pages/wording.argument.ts"
import { faulted, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { grammarTry as page } from "akasha/command/pages/grammar/try/grammar-try.command.ts"
import {
  type Defined,
  definitionsIn,
  lexiconAt,
  lexiconIn,
  rulesIn,
  type Spellings,
  START,
} from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
import {
  type Lexicon,
  type Rule,
  unspelledIn,
  waysIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { partOfSpeech } from "akasha/domain/plain-language/standard-agent-english/part-of-speech/part-of-speech.page-type.ts"
import { phraseKind } from "akasha/domain/plain-language/standard-agent-english/phrase-kind/phrase-kind.page-type.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const PART = `${partOfSpeech.slug}/`

const KIND = `${phraseKind.slug}/`

const COLON = ":"

const EQUALS = "="

const COMMA = ","

const ONE_WAY = 1

const MANY = 2

const MORE_THAN_ONE = "more than one"

const NONE = "none"

const INDENT = "  "

type Added = {
  readonly spelling: string
  readonly partOfSpeech: string
}

export type Kinds = {
  readonly parts: ReadonlySet<string>
  readonly kinds: ReadonlySet<string>
}

type Reading<Held> = {
  readonly read: readonly Held[]
  readonly refused: readonly string[]
}

type Trial = {
  readonly rules: readonly Rule[]
  readonly spellings: Spellings
}

type Shifts = {
  readonly gained: readonly Defined[]
  readonly lost: readonly Defined[]
}

export function addedIn(said: readonly string[], parts: ReadonlySet<string>): Reading<Added> {
  const read: Added[] = []
  const refused: string[] = []
  for (const one of said) {
    const at = one.lastIndexOf(COLON)
    const part = one.slice(at + 1)
    if (at <= 0 || part === "") {
      refused.push(
        `\`${addedSpelling.said} ${one}\` is no word and part of speech parted by a colon`
      )
      continue
    }
    if (!parts.has(part)) {
      refused.push(`\`${part}\` is no part of speech`)
      continue
    }
    read.push({ spelling: one.slice(0, at), partOfSpeech: `${PART}${part}` })
  }
  return { read, refused }
}

function itemOf(item: string, kinds: Kinds): string | null {
  if (kinds.parts.has(item)) return `${PART}${item}`
  if (kinds.kinds.has(item)) return `${KIND}${item}`
  return null
}

function constructionIn(one: string, kinds: Kinds): Rule | string {
  const at = one.indexOf(EQUALS)
  const items = one.slice(at + 1).split(COMMA)
  if (at <= 0 || items.includes("")) {
    return `\`${trialConstruction.said} ${one}\` is no phrase kind and items parted by an equals sign`
  }
  const kind = one.slice(0, at)
  if (!kinds.kinds.has(kind)) return `\`${kind}\` is no phrase kind`
  const writtenFrom: string[] = []
  for (const item of items) {
    const held = itemOf(item, kinds)
    if (held === null) return `\`${item}\` is no part of speech and no phrase kind`
    writtenFrom.push(held)
  }
  return { phraseKind: `${KIND}${kind}`, writtenFrom }
}

export function constructionsIn(said: readonly string[], kinds: Kinds): Reading<Rule> {
  const read: Rule[] = []
  const refused: string[] = []
  for (const one of said) {
    const held = constructionIn(one, kinds)
    if (typeof held === "string") refused.push(held)
    else read.push(held)
  }
  return { read, refused }
}

export function spellingsWith(spellings: Spellings, added: readonly Added[]): Spellings {
  if (added.length === 0) return spellings
  const global = new Map<string, Set<string>>()
  for (const [spelling, parts] of spellings.global) global.set(spelling, new Set(parts))
  for (const one of added) {
    const already = global.get(one.spelling)
    if (already === undefined) global.set(one.spelling, new Set([one.partOfSpeech]))
    else already.add(one.partOfSpeech)
  }
  return { global, scoped: spellings.scoped }
}

export function waysSaid(ways: number): string {
  return ways >= MANY ? MORE_THAN_ONE : String(ways)
}

export function wordingLines(
  said: string,
  lexicon: Lexicon,
  rules: readonly Rule[]
): readonly string[] {
  const unspelled = unspelledIn(said, lexicon)
  return [
    said,
    `${INDENT}ways: ${waysSaid(waysIn(said, rules, lexicon, START))}`,
    `${INDENT}not in the lexicon: ${unspelled.length === 0 ? NONE : unspelled.join(" ")}`,
  ]
}

function admits(one: Defined, trial: Trial): boolean {
  return (
    waysIn(one.definition, trial.rules, lexiconAt(trial.spellings, one.slug), START) === ONE_WAY
  )
}

export function shiftsIn(defined: readonly Defined[], before: Trial, after: Trial): Shifts {
  const gained: Defined[] = []
  const lost: Defined[] = []
  for (const one of defined) {
    const was = admits(one, before)
    const is = admits(one, after)
    if (is && !was) gained.push(one)
    if (was && !is) lost.push(one)
  }
  return { gained, lost }
}

export function shiftLines(shifts: Shifts): readonly string[] {
  return [
    ...shifts.gained.map((one) => `gains ${one.path}: ${one.definition}`),
    ...shifts.lost.map((one) => `loses ${one.path}: ${one.definition}`),
    `gained ${shifts.gained.length}, lost ${shifts.lost.length}`,
  ]
}

export function grammarTry(argv: readonly string[], given: Given): Answer {
  try {
    const pages = [lexiconScope, addedSpelling, trialConstruction, wording] as const
    const read = takenFor(argv, given.calledAs, page, pages)
    if ("refused" in read) return mistaking(read.refused)
    const index = shadowAt(given.root).index
    const kinds: Kinds = {
      parts: new Set(index.slugsOfType(partOfSpeech.slug)),
      kinds: new Set(index.slugsOfType(phraseKind.slug)),
    }
    const added = addedIn(read.taken.addedSpelling, kinds.parts)
    const tried = constructionsIn(read.taken.trialConstruction, kinds)
    const refusals = [...added.refused, ...tried.refused]
    if (refusals.length > 0) return mistaking(refusals)
    const before: Trial = { rules: rulesIn(index), spellings: lexiconIn(index) }
    const after: Trial = {
      rules: [...before.rules, ...tried.read],
      spellings: spellingsWith(before.spellings, added.read),
    }
    const lexicon = lexiconAt(after.spellings, read.taken.lexiconScope)
    const lines = read.taken.wording.flatMap((one) => wordingLines(one, lexicon, after.rules))
    if (added.read.length === 0 && tried.read.length === 0) return told(lines)
    return told([...lines, ...shiftLines(shiftsIn(definitionsIn(index), before, after))])
  } catch (thrown) {
    return faulted(thrown)
  }
}
