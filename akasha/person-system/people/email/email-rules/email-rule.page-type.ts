import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../../../temper/temper-things/properties/title.text-property.ts"
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
  extendsSlug: "page-type/page",
  partSlugs: [
    "record-property/email-rule-matches",
    "select-property/email-rule-match-comparison",
    "select-property/email-rule-match-field",
    "text-property/email-rule-match-values",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "email-rule-matches", required: true, many: true, max: 10 },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule is a match, a filing, the actions to take and a kind.",
    },
    {
      invariantKind: "departure",
      statement: "A rule is matched against an email message.",
    },
    {
      invariantKind: "departure",
      statement: "One person's rules are a set of their own, sharing nothing with another's.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's kind is the folder the rule stands in rather than a key on the rule.",
    },
    {
      invariantKind: "gap",
      statement: "The filing, the delay and the actions are yet to stand as properties.",
    },
  ],
} as const satisfies PageType
