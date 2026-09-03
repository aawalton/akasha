import type { PageType } from "@akasha/pages-system/page-type"
import type { EmailRule } from "../email-rule.page-type.ts"

export type EmailRuleCode = EmailRule

export const emailRuleCode = {
  id: "01a06828-59d3-7d52-bae3-818debc51db7",
  pageTypeSlug: "page-type",
  slug: "email-rule-code",
  definition: "an email rule its own clauses carry out",
  pluralSlug: "email-rule-codes",
  extendsSlug: "page-type/email-rule",
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
    {
      invariantKind: "gap",
      statement:
        "The filing, the delay, the actions and who mail is forwarded to are yet to stand as properties.",
    },
  ],
} as const satisfies PageType
