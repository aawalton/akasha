import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const accuracySeconds = {
  id: "01a06738-9f12-7dcb-b57a-122407b359b5",
  type: "page-type/number-property",
  slug: "accuracy-seconds",
  propertySlug: "accuracy-seconds",
  definition: "how far from its scheduled time a timer's run may be started",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A wider window lets a timer's run fall together with another timer's.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
