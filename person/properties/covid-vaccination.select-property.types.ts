import type { covidVaccination } from "akasha/person/properties/covid-vaccination.select-property.ts"

export type CovidVaccination = (typeof covidVaccination.values)[number]
