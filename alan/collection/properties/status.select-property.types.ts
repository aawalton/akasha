import type { status } from "akasha/alan/collection/properties/status.select-property.ts"

export type Status = (typeof status.values)[number]
