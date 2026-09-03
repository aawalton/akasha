import type { Refusal } from "../refusal.page-type.ts"

export const categoryRulesOverlap = {
  id: "01a06611-3982-7d35-aeaf-83c657727992",
  pageTypeSlug: "refusal",
  slug: "category-rules-overlap",
  title: "Category rules overlap",
  text: "{rule} and {other} both match {count} of the transactions this rule set can tell apart. One of them: {transaction}.\n\n`pages/domain/rules-engine.domain.md` holds that everything a set of rules judges matches exactly one of them, and nothing ranks two matches — no order, no score, no specificity. So a transaction these two share is one the rules do not settle, while each rule reads as settled and each author goes on believing theirs is the one that categorizes it.\n\nThe transaction is spelled out of the values the rules themselves compare against, so it is a transaction rather than an example: `some other account` and an empty field stand where nothing any rule names is to hold. It is one of the {count}, so narrowing a rule until that one stops being shared leaves the rest of the overlap standing.\n\nNarrow one of the two so their matches no longer meet, or make the pair three rules — what only the first claims, what only the second claims, and what both do.",
} as const satisfies Refusal
