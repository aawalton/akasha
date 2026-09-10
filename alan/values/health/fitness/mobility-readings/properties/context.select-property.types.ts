import type { context } from "./context.select-property.ts"

export type Context = (typeof context.values)[number]
