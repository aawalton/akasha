import type { Refusal } from "../refusal.page-type.ts"

export const emailMessageUnclaimed = {
  id: "01a06611-3986-74cc-b8b2-49148f211e55",
  pageTypeSlug: "refusal",
  slug: "email-message-unclaimed",
  title: "Email message unclaimed",
  text: "No rule under {folder} matches this message: {message}.\n\n`pages/domain/rules-engine.domain.md` holds that everything a set of rules judges matches exactly one of them. Mail no rule claims is left where it arrived: the worker files it nowhere and hands it to no agent. The count it leaves and the line it logs both come after the mail sat undecided, and neither names a rule that should have claimed it.\n\nThe message is spelled out of the values the rules themselves compare against, so it is a message rather than an example: `someone@unnamed.` and ` ~ ` stand where nothing any rule names is to hold.\n\nWiden a rule until it claims this, or write the rule that names it.",
} as const satisfies Refusal
