import type { Refusal } from "../refusal.page-type.ts"

export const emailRulesOverlap = {
  id: "01a06611-3988-77b9-b32d-129fc3cae667",
  pageTypeSlug: "refusal",
  slug: "email-rules-overlap",
  title: "Email rules overlap",
  text: "{rule} and {other} both match {count} of the messages this rule set can tell apart. One of them: {message}.\n\n`pages/domain/rules-engine.domain.md` holds that everything a set of rules judges matches exactly one of them, and nothing ranks two matches — no order, no score, no specificity. So the mail these two share is mail the rule set does not decide, while each rule reads as settled and each author goes on believing theirs is the one that acts on it.\n\nThe message is spelled out of the values the rules themselves compare against, so it is a message rather than an example: `someone@unnamed.` and ` ~ ` stand where nothing any rule names is to hold. It is one of the {count}, so narrowing a rule until that one message stops being shared leaves the rest of the overlap standing.\n\nNarrow one of the two so their matches no longer meet, or make the pair three rules — what only the first claims, what only the second claims, and what both do.",
} as const satisfies Refusal
