import type { PageType } from "@akasha/pages/page-type"
import type { EmailRule } from "../email-rule.page-type.types.ts"
import type { EmailRuleCodeActions } from "./properties/email-rule-code-actions.select-property.ts"
import type { EmailRuleCodeDelay } from "./properties/email-rule-code-delay.text-property.ts"
import type { EmailRuleCodeFiling } from "./properties/email-rule-code-filing.select-property.ts"
import type { EmailRuleCodeForwardTo } from "./properties/email-rule-code-forward-to.relation-property.ts"

export type EmailRuleCode = EmailRule & {
  filing: EmailRuleCodeFiling
  actions?: EmailRuleCodeActions
  delay?: EmailRuleCodeDelay
  forwardTo?: EmailRuleCodeForwardTo
}

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
} as const satisfies PageType
