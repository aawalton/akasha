import type { mechanic } from "./mechanic.select-property.ts"

export type Mechanic = (typeof mechanic.values)[number]
