import type { NumberProperty } from "@akasha/pages-system/number-property"

export type AccuracySeconds = number

export const accuracySeconds = {
  id: "01a06738-9f12-7dcb-b57a-122407b359b5",
  pageTypeSlug: "number-property",
  slug: "accuracy-seconds",
  propertySlug: "accuracy-seconds",
  definition: "how far from its scheduled time a timer's run may be started",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wider window lets a timer's run fall together with another timer's.",
    },
  ],
} as const satisfies NumberProperty
