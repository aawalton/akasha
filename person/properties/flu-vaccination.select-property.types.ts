import type { fluVaccination } from "akasha/person/properties/flu-vaccination.select-property.ts"

export type FluVaccination = (typeof fluVaccination.values)[number]
