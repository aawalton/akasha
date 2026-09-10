import type { difficulty } from "./difficulty.select-property.ts"

export type Difficulty = (typeof difficulty.values)[number]
