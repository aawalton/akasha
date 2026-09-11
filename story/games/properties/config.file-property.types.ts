import type { config } from "akasha/story/games/properties/config.file-property.ts"

export type Config = (typeof config.extensions)[number]
