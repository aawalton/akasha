import type { biomeConfig } from "akasha/code-system/workspaces/properties/biome-config.file-property.ts"

export type BiomeConfig = (typeof biomeConfig.extensions)[number]
