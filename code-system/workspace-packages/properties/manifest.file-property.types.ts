import type { manifest } from "akasha/code-system/workspace-packages/properties/manifest.file-property.ts"

export type Manifest = (typeof manifest.extensions)[number]
