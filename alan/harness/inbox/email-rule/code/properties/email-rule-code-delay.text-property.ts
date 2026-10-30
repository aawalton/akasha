import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const emailRuleCodeDelay = {
  id: "01a06860-54a0-7230-bcc6-36683850bf02",
  type: "page-type/text-property",
  slug: "email-rule-code-delay",
  propertySlug: "delay",
  definition: "the time an email rule waits before the rule handles a new email",
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
  createdAt: "2026-09-03T17:45:38.720Z",
  updatedAt: "2026-10-30T15:41:56.210Z",
} as const satisfies TextProperty
