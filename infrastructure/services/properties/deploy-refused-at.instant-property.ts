import type { InstantProperty } from "akasha/pages/instant-properties/instant-property.page-type.types.ts"

export const deployRefusedAt = {
  id: "01a095ca-a548-7026-b32c-6fac55373b71",
  type: "instant-property",
  slug: "deploy-refused-at",
  propertySlug: "deploy-refused-at",
  definition: "when the last deploy of a service that refused ended",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy that refused writes this moment and the moment its deploy ended alike.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that put up writes the moment it ended and leaves this one behind it.",
    },
    {
      invariantKind: "departure",
      statement: "The two moments being the same is what says the last deploy refused.",
    },
    {
      invariantKind: "departure",
      statement: "A service whose last deploy refused waits longer than its own cooldown.",
    },
    {
      invariantKind: "departure",
      statement: "The moment is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
