import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const countedOn = {
  id: "01a0d4a9-187f-7c3b-851d-fa87419090f7",
  type: "page-type/select-property",
  slug: "counted-on",
  propertySlug: "counted-on",
  definition: "the day whose page holds the number a readout shows",
  values: ["eso-day", "opened-day"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The ESO day is the day the tracking counts are written under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The opened day is the day the inbox tracking poll writes the mail count under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating no day is counted by nothing that reads a day.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T18:24:06.783Z",
  updatedAt: "2026-10-30T16:23:05.803Z",
} as const satisfies SelectProperty
