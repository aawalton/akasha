import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const warm = {
  id: "01a09098-2cd1-75ad-a4bc-9be7316e752e",
  type: "boolean-property",
  slug: "warm",
  propertySlug: "warm",
  definition: "whether the pool holds a service up before anything asks for it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A service saying nothing here comes up when it is first asked for.",
    },
    {
      invariantKind: "departure",
      statement: "Only a service the pool fronts is held up this way.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
