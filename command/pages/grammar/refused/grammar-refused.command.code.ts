import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { everyRefusedDefinition } from "akasha/command/argument/pages/every-refused-definition.argument.ts"
import { first } from "akasha/command/argument/pages/first.argument.ts"
import { within } from "akasha/command/argument/pages/within.argument.ts"
import { faulted, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { grammarRefused as page } from "akasha/command/pages/grammar/refused/grammar-refused.command.ts"
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
  type Rule,
  unspelledIn,
  waysIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const ONE_WAY = 1

const NONE = "none"

const INDENT = "  "

export function isWithin(path: string, openings: readonly string[]): boolean {
  return openings.length === 0 || openings.some((opening) => path.startsWith(opening))
}

export function refusedIn(
  defined: readonly Defined[],
  rules: readonly Rule[],
  spellings: Spellings
): readonly Defined[] {
  return defined.filter(
    (one) => waysIn(one.definition, rules, lexiconAt(spellings, one.slug), START) !== ONE_WAY
  )
}

export function totalsLine(definitions: number, refused: number): string {
  return `definitions ${definitions}, admitted ${definitions - refused}, refused ${refused}`
}

export function refusalLines(one: Defined, unspelled: readonly string[]): readonly string[] {
  const words = unspelled.length === 0 ? NONE : unspelled.join(" ")
  return [one.path, `${INDENT}${one.definition}`, `${INDENT}not in the lexicon: ${words}`]
}

export function grammarRefused(argv: readonly string[], given: Given): Answer {
  try {
    const read = takenFor(argv, given.calledAs, page, [first, everyRefusedDefinition, within])
    if ("refused" in read) return mistaking(read.refused)
    const index = shadowAt(given.root).index
    const spellings = lexiconIn(index)
    const defined = definitionsIn(index).filter((one) => isWithin(one.path, read.taken.within))
    const refused = refusedIn(defined, rulesIn(index), spellings)
    const shown = read.taken.everyRefusedDefinition ? refused : refused.slice(0, read.taken.first)
    return told([
      totalsLine(defined.length, refused.length),
      ...shown.flatMap((one) =>
        refusalLines(one, unspelledIn(one.definition, lexiconAt(spellings, one.slug)))
      ),
    ])
  } catch (thrown) {
    return faulted(thrown)
  }
}
