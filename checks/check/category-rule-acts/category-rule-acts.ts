import { relative } from "node:path"
import { blockOf, stringAt } from "../../../page/text/text.ts"
import { comparisonsFor, mispaired, parseMatch } from "../../../rule/match/match.ts"
import { ruleSetNamed } from "../../../rule/set/set.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const RULE_SET = "category-rule"

const CODE = "code"

const NOTE = "note"

const CATEGORY = "category"

const COUNTERPART = "counterpart-within-days"

const NEVER_APPLIED =
  "it hands the transaction to a person rather than categorizing it, so nothing ever applies the rule"

const ONLY_ONE_LEG =
  "it pairs a counterpart and applying it writes two legs, of which only the subject's date is held"

function unlandable(named: string | null, counterpart: string | null): string | null {
  if (named === null) return NEVER_APPLIED
  if (counterpart !== null) return ONLY_ONE_LEG
  return null
}

export const categoryRuleActs: Check = {
  slug: "category-rule-acts",
  needs: "tree",
  run: ({ paths, tree }) => {
    const set = ruleSetNamed(RULE_SET)
    if (set === null) return []
    const failures: CheckFailure[] = []
    for (const path of paths) {
      const at = set.path.exec(relative(tree.root, path))
      if (at === null) continue
      const body = tree.at(path)
      if (body === null) continue
      const text = body.toString("utf8")
      for (const loose of mispaired(set.fields, parseMatch(set.fields, text).conditions)) {
        const takes = comparisonsFor(set.fields, loose.field)
          .map((one) => `\`${one}\``)
          .join(" or ")
        failures.push({
          path,
          reason:
            `matches on \`${loose.field} ${loose.test}\`, which never holds — ` +
            `\`${loose.field}\` takes ${takes === "" ? "no comparison here" : takes}`,
        })
      }
      if ((at.groups?.kind ?? "") !== CODE) continue
      const { fm, why } = blockOf(text)
      if (why !== null) continue
      if (stringAt(fm, NOTE) === null) continue
      const said = unlandable(stringAt(fm, CATEGORY), stringAt(fm, COUNTERPART))
      if (said === null) continue
      failures.push({ path, reason: `carries a \`${NOTE}\` that never lands: ${said}` })
    }
    return failures
  },
}

export default categoryRuleActs
