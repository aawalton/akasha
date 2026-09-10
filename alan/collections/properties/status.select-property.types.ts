import type { status } from "./status.select-property.ts"

export type Status = (typeof status.values)[number]
