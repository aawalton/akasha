import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const warm = {
  id: "01a09098-2cd1-75ad-a4bc-9be7316e752e",
  type: "page-type/boolean-property",
  slug: "warm",
  propertySlug: "warm",
  definition: "whether the pool holds a service up before anything asks for it",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A service saying nothing here comes up when it is first asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a service the pool fronts is held up this way.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-11T13:11:27.185Z",
  updatedAt: "2026-09-24T19:06:05.000Z",
} as const satisfies BooleanProperty
