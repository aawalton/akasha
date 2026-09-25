import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const idleCompactWindow = {
  id: "01a0c58b-26fc-75b8-bc78-2fdec88de82d",
  type: "page-type/number-property",
  slug: "idle-compact-window",
  propertySlug: "idle-compact-window",
  definition: "how much context a seat that waits has before the context is summarized",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This count is under the count a seat's own harness compacts at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat under this count is left as it is however long that seat is idle.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
