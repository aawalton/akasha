import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const deployEndedAt = {
  id: "01a0957d-cd0e-7ca7-a6b4-b04a75b1af4e",
  type: "page-type/instant-property",
  slug: "deploy-ended-at",
  propertySlug: "deploy-ended-at",
  definition: "when the last deploy of a service ended, whether that deploy put up or refused",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The deploy writes the moment as that deploy ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A deploy that refused moves the moment, since a refusal costs what a deploy costs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The cooldown a service waits out is counted from this moment.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
