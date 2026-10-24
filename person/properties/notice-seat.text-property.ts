import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const noticeSeat = {
  id: "01a16fdf-e6d0-7add-a5d1-ecaf6605ed32",
  type: "page-type/text-property",
  slug: "notice-seat",
  propertySlug: "seat",
  definition: "the id of the seat a person's notice is for",
  maxLength: 36,
  nameFormat: "name-format/lower-uuid",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice names its seat by the seat's id, which a rename of the seat keeps.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:45:07.022Z",
  updatedAt: "2026-10-24T21:45:07.022Z",
} as const satisfies TextProperty
