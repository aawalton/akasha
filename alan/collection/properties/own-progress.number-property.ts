import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const ownProgress = {
  id: "01a06553-4713-7001-b03b-f1f7f97f1aa8",
  type: "page-type/number-property",
  slug: "own-progress",
  propertySlug: "own-progress",
  definition: "the progress through a collection without its parts counted in its unit",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Progress is read against the collection's own length rather than against its parts.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:32:31.635Z",
  updatedAt: "2026-10-30T15:09:02.369Z",
} as const satisfies NumberProperty
