import type { PageType } from "@akasha/pages-system/page-type"
import type { EmailRule } from "../email-rule.page-type.ts"
import type { EmailRuleCodeActions } from "./properties/email-rule-code-actions.select-property.ts"
import type { EmailRuleCodeDelay } from "./properties/email-rule-code-delay.text-property.ts"
import type { EmailRuleCodeFiling } from "./properties/email-rule-code-filing.select-property.ts"
import type { EmailRuleCodeForwardToSlug } from "./properties/email-rule-code-forward-to-slug.relation-property.ts"

export type EmailRuleCode = EmailRule & {
  filing: EmailRuleCodeFiling
  actions?: readonly EmailRuleCodeActions[]
  delay?: EmailRuleCodeDelay
  forwardToSlug?: EmailRuleCodeForwardToSlug
}

export const emailRuleCode = {
  id: "01a06828-59d3-7d52-bae3-818debc51db7",
  pageTypeSlug: "page-type",
  slug: "email-rule-code",
  definition: "an email rule its own clauses carry out",
  pluralSlug: "email-rule-codes",
  extendsSlug: ["page-type/email-rule"],
  partSlugs: [
    "relation-property/email-rule-code-forward-to-slug",
    "select-property/email-rule-code-actions",
    "select-property/email-rule-code-filing",
    "text-property/email-rule-code-delay",
  ],
  properties: [
    { pagePropertySlug: "email-rule-code-filing", required: true, many: false },
    { pagePropertySlug: "email-rule-code-actions", required: false, many: true, max: 2 },
    { pagePropertySlug: "email-rule-code-delay", required: false, many: false },
    { pagePropertySlug: "email-rule-code-forward-to-slug", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind is settled by its clauses without anybody reading the mail.",
    },
    {
      invariantKind: "departure",
      statement:
        "Filing is a key of its own, archiving or skipping, rather than one of the actions.",
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
