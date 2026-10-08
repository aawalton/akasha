import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const keptForHours = {
  id: "01a09b29-136d-7840-bc21-35c8e29af410",
  type: "page-type/number-property",
  slug: "kept-for-hours",
  propertySlug: "kept-for-hours",
  definition: "how long a line beside a page is kept before a sweep takes that line away",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A window is stated in hours however long that window is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating no window holds a file nothing sweeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window reaches every part of a file rather than the last part alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part a sweep empties goes rather than being left holding nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-13T14:25:55.565Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies NumberProperty
