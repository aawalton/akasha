import type { modelManifest } from "akasha/domains/plain-language/parser-models/properties/model-manifest.file-property.ts"

export type ModelManifest = (typeof modelManifest.extensions)[number]
