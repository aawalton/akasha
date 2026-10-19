import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const idleCompactWindow = {
  id: "01a0c58b-26fc-75b8-bc78-2fdec88de82d",
  type: "page-type/number-property",
  slug: "idle-compact-window",
  propertySlug: "idle-compact-window",
  definition: "the number of tokens a seat that waits compacts at",
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
  createdAt: "2026-09-21T19:57:06.172Z",
  updatedAt: "2026-10-19T19:56:51.066Z",
} as const satisfies NumberProperty
