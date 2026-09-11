import type { bunConfig } from "akasha/code-system/workspaces/properties/bun-config.file-property.ts"

export type BunConfig = (typeof bunConfig.extensions)[number]
