import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const deployEndedAt = {
  id: "01a0957d-cd0e-7ca7-a6b4-b04a75b1af4e",
  type: "instant-property",
  slug: "deploy-ended-at",
  propertySlug: "deploy-ended-at",
  definition: "when the last deploy of a service ended, whether that deploy put up or refused",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The deploy writes the moment as that deploy ends.",
    },
    {
      invariantKind: "departure",
      statement:
        "A deploy that refused moves the moment, since a refusal costs what a deploy costs.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run leaves the moment as that moment was.",
    },
    {
      invariantKind: "departure",
      statement: "The cooldown a service waits out is counted from this moment.",
    },
    {
      invariantKind: "departure",
      statement: "The moment is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
