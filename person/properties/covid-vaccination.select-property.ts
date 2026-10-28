import type { SelectProperty } from "akasha/page/select-property/select-property.page-type.types.ts"

export const covidVaccination = {
  id: "01a18411-4182-7a39-8c5b-689be8253251",
  type: "page-type/select-property",
  slug: "covid-vaccination",
  propertySlug: "covid-vaccination",
  definition: "how often a person is vaccinated against COVID-19",
  values: ["none", "yearly"],
  types: "ts",
  createdAt: "2026-10-28T19:51:25.825Z",
  updatedAt: "2026-10-28T19:51:25.825Z",
} as const satisfies SelectProperty
