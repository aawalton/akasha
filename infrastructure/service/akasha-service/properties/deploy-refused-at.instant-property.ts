import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const deployRefusedAt = {
  id: "01a095ca-a548-7026-b32c-6fac55373b71",
  type: "page-type/instant-property",
  slug: "deploy-refused-at",
  propertySlug: "deploy-refused-at",
  definition: "when the last deploy of a service that refused ended",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that refused writes this moment and the moment its deploy ended alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that put up writes the moment it ended and leaves this one behind it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The two moments being the same is what says the last deploy refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service whose last deploy refused waits longer than its own cooldown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
