import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const setDropZones = {
  id: "01a0d8e1-0ec0-7531-b00c-66aea9d20255",
  type: "page-type/number-property",
  slug: "set-drop-zones",
  propertySlug: "set-drop-zones",
  definition: "the zone ids of the places a set's pieces drop",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A zone is stated in the place its drop way has, so a zone can repeat.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
