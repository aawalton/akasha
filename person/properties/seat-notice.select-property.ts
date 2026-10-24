import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const seatNotice = {
  id: "01a16fdf-e6d0-7c8b-9da3-5dd86297ad3d",
  type: "page-type/select-property",
  slug: "seat-notice",
  propertySlug: "notice",
  definition: "where a person is told a seat's reply has finished",
  values: ["phone", "desktop", "both", "none"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone notice is the push the seat's supervisor sends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A desktop notice is the notification the seat's page shows in a browser.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T21:45:07.022Z",
  updatedAt: "2026-10-24T21:45:07.022Z",
} as const satisfies SelectProperty
