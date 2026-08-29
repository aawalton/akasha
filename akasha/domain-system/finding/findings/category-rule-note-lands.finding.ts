import type { Finding } from "../finding.page-type.ts"

export const categoryRuleNoteLands = {
  id: "01a04ff0-af13-7255-89f6-665519093d80",
  pageTypeSlug: "finding",
  slug: "category-rule-note-lands",
  domainSlug: "domain/checks-system",
  claim:
    "The old `category-rule-acts` check did two things under one name. One half is a type once category rules are modules. The other half is not, and nothing carries it: a code-kind category rule may hold a `note` that never lands, and the 133 category-rule pages have no guard against it.",
  evidence:
    'The first half refused a match whose field does not take the comparison written, reading `comparisonsFor(set.fields, field)` at runtime to learn which comparisons a field accepts. Once a category rule is a module that is a discriminated union: `{ field: "amount", test: ">" | "<" | "=" }` beside `{ field: "merchant", test: "is" | "contains" }`, where a wrong pairing does not compile and no check runs at all. The second half refused a code-kind rule carrying a `note` that never lands, for one of two reasons its code names: naming no category hands the transaction to a person, so nothing ever applies the rule; and pairing a counterpart writes two legs, of which only the subject\'s date is held. No type expresses either. It is knowledge about ledgers, not about pages. The old check declared `needs: "tree"` only because `ruleSetNamed` loads the whole rule set off disk to learn what fields exist; a rule page in akasha would read the index together with the change, so what survives is a per-page patch check rather than a whole-tree one. 133 category-rule pages stand under `pages/`, in the sets `category-rule-agent`, `category-rule-code` and `category-rule-merchant`. None stands under `akasha/`, which is why the check could not be carried when the old system was ablated.',
} as const satisfies Finding
