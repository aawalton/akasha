import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { Properties } from "../types/properties/properties.record-property.ts"
import type { RenderedAs } from "./properties/rendered-as.text-property.ts"

export type PagePropertyEntry = PageProperty & {
  properties: Properties
  renderedAs?: RenderedAs
}
