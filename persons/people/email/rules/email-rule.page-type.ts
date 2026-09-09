import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { EmailRuleMatches } from "./properties/email-rule-matches.record-property.ts"

export type EmailRule = Page & {
  title: Title
  matches: EmailRuleMatches
}

export const emailRule = {
  id: "01a06828-59d3-7486-8463-b59a1768c717",
  pageTypeSlug: "page-type",
  slug: "email-rule",
  definition: "what to do with some of a person's mail",
  pluralSlug: "email-rules",
  extends: ["page-type/page"],
  parts: [
    "page-type/email-rule-agent",
    "page-type/email-rule-code",
    "record-property/email-rule-matches",
    "select-property/email-rule-match-comparison",
    "select-property/email-rule-match-field",
    "text-property/email-rule-match-values",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    {
      pagePropertySlug: "record-property/email-rule-matches",
      required: true,
      many: true,
      maxCount: 10,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is matched against an email message.",
    },
    {
      invariantKind: "departure",
      statement: "One person's rules are a set of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
  ],
} as const satisfies PageType
