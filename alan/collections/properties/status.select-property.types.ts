import type { status } from "akasha/alan/collections/properties/status.select-property.ts"

export type Status = (typeof status.values)[number]
