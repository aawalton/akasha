import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const countedOn = {
  id: "01a0d4a9-187f-7c3b-851d-fa87419090f7",
  type: "page-type/select-property",
  slug: "counted-on",
  propertySlug: "counted-on",
  definition: "which day's page a readout's count is read from",
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
} as const satisfies SelectProperty
