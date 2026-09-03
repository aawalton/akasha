import type { Refusal } from "../refusal.page-type.ts"

export const emailRuleMatchUnreadable = {
  id: "01a06611-3987-786f-983d-0c06ae825c0a",
  pageTypeSlug: "refusal",
  slug: "email-rule-match-unreadable",
  title: "Email rule match unreadable",
  text: "{count} line(s) under `# Match` in {rule} are not a condition or a value this reader understands. One unreadable rule stops its whole folder being decided, so no rule there was examined — not just this one.\n\nA condition is a field and a comparison — `- **from** ends with` — with its accepted values as code-marked children beneath it. Nothing was assumed about the lines that could not be read: conditions all have to hold, so dropping one quietly widens the rule rather than narrowing it, and a match left holding none matches everything.\n\nIf the body looks right, check its field and its comparison against what `tools/lib/email-rule-set.ts` declares. The reader's vocabulary is built from that declaration on every run, so a spelling it rejects is one the declaration does not carry.",
} as const satisfies Refusal
