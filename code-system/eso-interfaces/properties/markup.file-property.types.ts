import type { markup } from "akasha/code-system/eso-interfaces/properties/markup.file-property.ts"

export type Markup = (typeof markup.extensions)[number]
