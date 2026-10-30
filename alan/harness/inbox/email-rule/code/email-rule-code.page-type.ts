import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailRuleCode = {
  id: "01a06828-59d3-7d52-bae3-818debc51db7",
  type: "page-type/page-type",
  slug: "email-rule-code",
  definition: "an email rule that code settles",
  extends: ["page-type/email-rule"],
  parts: [
    "relation-property/email-rule-code-forward-to",
    "select-property/email-rule-code-actions",
    "select-property/email-rule-code-filing",
    "text-property/email-rule-code-delay",
    "boolean-property/email-rule-code-rescue-from-spam",
  ],
  properties: [
    { pageProperty: "select-property/email-rule-code-filing", required: true, many: false },
    {
      pageProperty: "select-property/email-rule-code-actions",
      required: false,
      many: true,
      maxCount: 2,
    },
    { pageProperty: "text-property/email-rule-code-delay", required: false, many: false },
    {
      pageProperty: "relation-property/email-rule-code-forward-to",
      required: false,
      many: false,
    },
    {
      pageProperty: "boolean-property/email-rule-code-rescue-from-spam",
      required: false,
      many: false,
    },
  ],
  loadedBy: "module/email-rule-reading",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule of this kind is settled by its clauses without anybody reading the mail.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Filing is a key of its own rather than an action.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule forwards by naming who receives the mail.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "There is no forward action.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:44:30.035Z",
  updatedAt: "2026-10-30T15:38:19.672Z",
} as const satisfies PageType
