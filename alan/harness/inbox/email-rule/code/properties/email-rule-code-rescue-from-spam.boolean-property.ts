import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const emailRuleCodeRescueFromSpam = {
  id: "01a11c51-e0d9-7ac3-a3de-1a909f865a50",
  type: "page-type/boolean-property",
  slug: "email-rule-code-rescue-from-spam",
  propertySlug: "rescue-from-spam",
  definition:
    "whether an email rule moves each email that matches the rule from spam into the inbox",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule stating nothing leaves its mail in spam.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued message loses the spam label and gains the inbox label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rescued message is then judged by the rules as any mail in the inbox is.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-08T16:21:30.456Z",
  updatedAt: "2026-10-30T15:45:35.499Z",
} as const satisfies BooleanProperty
