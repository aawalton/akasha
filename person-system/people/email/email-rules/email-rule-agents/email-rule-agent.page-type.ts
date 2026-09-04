import type { PageType } from "@akasha/pages-system/page-type"
import type { EmailRule } from "../email-rule.page-type.ts"
import type { EmailRuleJudgement } from "./properties/email-rule-judgement.text-property.ts"

export type EmailRuleAgent = EmailRule & {
  judgement: EmailRuleJudgement
}

export const emailRuleAgent = {
  id: "01a06828-59d3-7dd3-b9b9-fa6dda8d02d4",
  pageTypeSlug: "page-type",
  slug: "email-rule-agent",
  definition: "an email rule an agent carries out",
  pluralSlug: "email-rule-agents",
  extendsSlug: "page-type/email-rule",
  partSlugs: ["text-property/email-rule-judgement"],
  properties: [{ pagePropertySlug: "email-rule-judgement", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule of this kind narrows the mail and leaves the answer to an agent.",
    },
    {
      invariantKind: "departure",
      statement: "A rule of this kind states what to weigh rather than what to do.",
    },
    {
      invariantKind: "departure",
      statement:
        "Mail nobody has yet understood reaches a rule of this kind rather than being acted on by pattern.",
    },
    {
      invariantKind: "departure",
      statement:
        "A case an agent comes to understand becomes a code rule and stops reaching this one.",
    },
  ],
} as const satisfies PageType
