import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { lexiconScope } from "akasha/command/argument/pages/lexicon-scope.argument.ts"
import { lexiconWord } from "akasha/command/argument/pages/lexicon-word.argument.ts"
import { faulted, told } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { grammarWords as page } from "akasha/command/pages/grammar/words/grammar-words.command.ts"
import {
  lexiconAt,
  lexiconIn,
} from "akasha/domain/plain-language/standard-agent-english/modules/grammar-reading/grammar-reading.module.code.ts"
import type { Lexicon } from "akasha/domain/plain-language/standard-agent-english/modules/phrase-parsing/phrase-parsing.module.code.ts"
import { slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const NONE = "none"

export function partsLine(word: string, lexicon: Lexicon): string {
  const parts = [...(lexicon.get(word) ?? [])].map((part) => slugIn(part) ?? part).sort()
  return `${word}: ${parts.length === 0 ? NONE : parts.join(", ")}`
}

export function grammarWords(argv: readonly string[], given: Given): Answer {
  try {
    const read = takenFor(argv, given.calledAs, page, [lexiconScope, lexiconWord])
    if ("refused" in read) return mistaking(read.refused)
    const lexicon = lexiconAt(lexiconIn(shadowAt(given.root).index), read.taken.lexiconScope)
    return told(read.taken.lexiconWord.map((word) => partsLine(word, lexicon)))
  } catch (thrown) {
    return faulted(thrown)
  }
}
