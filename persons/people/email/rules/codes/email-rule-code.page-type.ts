import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const emailRuleCode = {
  id: "01a06828-59d3-7d52-bae3-818debc51db7",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "email-rule-code",
  definition: "an email rule its own clauses carry out",
  pluralSlug: "email-rule-codes",
  extends: ["page-type/email-rule"],
  parts: [
    "relation-property/email-rule-code-forward-to",
    "select-property/email-rule-code-actions",
    "select-property/email-rule-code-filing",
    "text-property/email-rule-code-delay",
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
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind is settled by its clauses without anybody reading the mail.",
    },
    {
      invariantKind: "departure",
      statement: "Filing is a key of its own rather than an action.",
    },
    {
      invariantKind: "departure",
      statement: "A rule forwards by naming who receives the mail.",
    },
    {
      invariantKind: "absence",
      statement: "There is no forward action.",
    },
  ],
  types: "ts",
} as const satisfies PageType
