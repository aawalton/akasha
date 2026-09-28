import type { InstantProperty } from "akasha/page/instant-property/instant-property.page-type.types.ts"

export const storyOpensAt = {
  id: "01a0e7f1-002b-75c8-9a58-6c3cc0e9ca4a",
  type: "page-type/instant-property",
  slug: "story-opens-at",
  propertySlug: "opens-at",
  definition: "the in-game day a story played opens on",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story played stating the day it opens on says its clock as a count of days from that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story whose player knows no calendar of its world states the day it opens on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is written as UTC midnight, as a turn's end time is written in UTC.",
    },
  ],
  types: "ts",
} as const satisfies InstantProperty
