import type { capacitorConfig } from "akasha/code-system/ios-apps/properties/capacitor-config.file-property.ts"

export type CapacitorConfig = (typeof capacitorConfig.extensions)[number]
