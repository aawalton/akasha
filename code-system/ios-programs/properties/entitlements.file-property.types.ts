import type { entitlements } from "akasha/code-system/ios-programs/properties/entitlements.file-property.ts"

export type Entitlements = (typeof entitlements.extensions)[number]
