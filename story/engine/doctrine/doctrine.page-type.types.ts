import type { Page } from "../../../pages/page.page-type.ts"
import type { DoctrineVersion } from "./properties/doctrine-version.number-property.ts"
import type { GateDimensions } from "./properties/gate-dimensions.file-property.ts"
import type { Policies } from "./properties/policies.file-property.ts"
import type { SheetTemplate } from "./properties/sheet-template.file-property.ts"
import type { TallyCatalog } from "./properties/tally-catalog.file-property.ts"

export type Doctrine = Page & {
  doctrineVersion: DoctrineVersion
  policies?: Policies
  gateDimensions?: GateDimensions
  sheetTemplate?: SheetTemplate
  tallyCatalog?: TallyCatalog
}
