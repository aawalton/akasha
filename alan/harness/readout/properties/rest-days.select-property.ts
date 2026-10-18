import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const restDays = {
  id: "01a14f50-bfa4-78c2-90b4-5a976b36213d",
  type: "page-type/select-property",
  slug: "rest-days",
  propertySlug: "rest-days",
  definition: "the days of the week on which a readout is drawn blue whatever its reading",
  values: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rest day is the day of the week of the ESO day the readout is drawn for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout keeps its own figure on a rest day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout stating no rest day is colored by its scale every day.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-18T14:00:54.435Z",
  updatedAt: "2026-10-18T14:00:54.435Z",
} as const satisfies SelectProperty
