import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const nextAt = {
  id: "01a05f42-d941-7005-9b78-ea153ee9fc0f",
  type: "page-type/instant-property",
  slug: "next-at",
  propertySlug: "next-at",
  definition: "the next time a reminder is sent",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The reminders that are due are read from here rather than worked out from the clock alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page with no such instant has never been armed.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-01T23:16:51.649Z",
  updatedAt: "2026-10-30T16:06:14.302Z",
} as const satisfies InstantProperty
