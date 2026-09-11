import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { DoctrineVersion } from "akasha/story/engine/doctrine/properties/doctrine-version.number-property.types.ts"
import type { GateDimensions } from "akasha/story/engine/doctrine/properties/gate-dimensions.file-property.ts"
import type { Policies } from "akasha/story/engine/doctrine/properties/policies.file-property.ts"
import type { SheetTemplate } from "akasha/story/engine/doctrine/properties/sheet-template.file-property.ts"
import type { TallyCatalog } from "akasha/story/engine/doctrine/properties/tally-catalog.file-property.ts"

export type Doctrine = Page & {
  doctrineVersion: DoctrineVersion
  policies?: Policies
  gateDimensions?: GateDimensions
  sheetTemplate?: SheetTemplate
  tallyCatalog?: TallyCatalog
}
