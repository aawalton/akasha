import type { bindings } from "akasha/code-system/eso-addons/properties/bindings.file-property.ts"

export type Bindings = (typeof bindings.extensions)[number]
