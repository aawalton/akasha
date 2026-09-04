import type { TextProperty } from "@akasha/pages-system/text-property"

export type EmailRuleCodeDelay = string

export const emailRuleCodeDelay = {
  id: "01a06860-54a0-7230-bcc6-36683850bf02",
  pageTypeSlug: "text-property",
  slug: "email-rule-code-delay",
  propertySlug: "delay",
  definition: "how long after mail arrives before the rule acts on it",
  max: 10,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A delay is a count of minutes or hours, written as digits and then `m` or `h`.",
    },
    {
      invariantKind: "departure",
      statement: "A rule stating no delay acts as soon as the mail is read.",
    },
  ],
} as const satisfies TextProperty
