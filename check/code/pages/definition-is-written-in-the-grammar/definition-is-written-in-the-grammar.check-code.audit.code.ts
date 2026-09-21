import {
  DOMAIN_TYPE,
  lexiconIn,
  reasonsIn,
  rulesIn,
} from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.decision.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

export function definitionIsWrittenInTheGrammar(root: string): readonly Judged[] {
  const shadow = shadowAt(root)
  const rules = rulesIn(shadow.index)
  const lexicon = lexiconIn(shadow.index)
  const said: Judged[] = []
  for (const kind of shadow.index.kindsUnder(shadow.index.typeSlugOf(DOMAIN_TYPE))) {
    for (const [path, value] of shadow.index.valuesByPath(kind)) {
      said.push(...reasonsIn(path, value, rules, lexicon))
    }
  }
  return said
}
