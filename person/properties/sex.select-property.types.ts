import type { sex } from "akasha/person/properties/sex.select-property.ts"

export type Sex = (typeof sex.values)[number]
