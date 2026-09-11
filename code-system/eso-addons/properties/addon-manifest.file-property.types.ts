import type { addonManifest } from "akasha/code-system/eso-addons/properties/addon-manifest.file-property.ts"

export type AddonManifest = (typeof addonManifest.extensions)[number]
