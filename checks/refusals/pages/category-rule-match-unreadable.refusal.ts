import type { Refusal } from "../refusal.page-type.ts"

export const categoryRuleMatchUnreadable = {
  id: "01a06611-3981-7237-ac17-80f6c64d85f6",
  pageTypeSlug: "refusal",
  slug: "category-rule-match-unreadable",
  title: "Category rule match unreadable",
  text: "{rule} holds {count} line(s) under `# Match` that cannot be read as a condition or a value.\n\nA match is a set of conditions all of which must hold, so a match holding none matches everything — which means a line silently dropped does not narrow a rule, it widens one. A reader that passed over what it could not parse would turn a narrow rule into a terminal one and report nothing.\n\nA condition is `- **field** comparison` with its accepted values as `` `code` `` children beneath it.",
} as const satisfies Refusal
