import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleCodeDelay = {
  id: "01a06860-54a0-7230-bcc6-36683850bf02",
  type: "page-type/text-property",
  slug: "email-rule-code-delay",
  propertySlug: "delay",
  definition: "how long after mail arrives before the rule acts on it",
  maxLength: 10,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A delay is a count of minutes or hours.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delay is written as digits and then `m` or `h`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating no delay acts as soon as the mail is read.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
