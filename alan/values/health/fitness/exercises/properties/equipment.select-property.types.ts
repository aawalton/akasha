import type { equipment } from "./equipment.select-property.ts"

export type Equipment = (typeof equipment.values)[number]
