import {
  DOMAIN_TYPE,
  lexiconIn,
  reasonsIn,
  rulesIn,
} from "akasha/check/code/pages/definition-is-written-in-the-grammar/definition-is-written-in-the-grammar.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function definitionIsWrittenInTheGrammar(root: string): readonly Judged[] {
  const index = commitIn(root).index
  const rules = rulesIn(index)
  const lexicon = lexiconIn(index)
  const said: Judged[] = []
  for (const kind of index.kindsUnder(index.typeSlugOf(DOMAIN_TYPE))) {
    for (const [path, value] of index.valuesByPath(kind)) {
      said.push(...reasonsIn(path, value, rules, lexicon))
    }
  }
  return said
}
