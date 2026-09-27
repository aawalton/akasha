import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldAppointment = {
  id: "01a0e3b2-a003-7bf8-a19f-54df5fd87c0c",
  type: "page-type/page-type",
  slug: "world-appointment",
  definition: "a meeting characters arranged in play for a set time",
  pluralSlug: "appointments",
  extends: ["page-type/world-mechanic"],
  runsTabooCheck: false,
  parts: ["instant-property/appointment-at", "text-property/appointment-place"],
  properties: [
    {
      pageProperty: "multi-relation-property/characters",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "instant-property/appointment-at", required: true, many: false },
    { pageProperty: "text-property/appointment-place", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An appointment's title says plainly what it is and who it is with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An appointment changed in play is changed here, and one called off is removed.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
