import type { Domain } from "akasha/domain/domain.page-type.types.ts"
import type { SelectOptionColors } from "akasha/page/select-property/properties/select-option-colors.record-property.types.ts"
import type { SelectValues } from "akasha/page/select-property/properties/select-values.text-property.types.ts"
import type { AllowsTmpPaths } from "akasha/page/type/properties/allows-tmp-paths.boolean-property.types.ts"
import type { BodyPropertyId } from "akasha/page/type/properties/body-property-id.text-property.types.ts"
import type { DetailConfig } from "akasha/page/type/properties/detail-config.record-property.types.ts"
import type { DrawnOffline } from "akasha/page/type/properties/drawn-offline.boolean-property.types.ts"
import type { ExtendsType } from "akasha/page/type/properties/extends-type.multi-relation-property.types.ts"
import type { LoadedBy } from "akasha/page/type/properties/loaded-by.relation-property.types.ts"
import type { LoadedExport } from "akasha/page/type/properties/loaded-export.text-property.types.ts"
import type { MediaConfig } from "akasha/page/type/properties/media-config.record-property.types.ts"
import type { Mortal } from "akasha/page/type/properties/mortal.boolean-property.types.ts"
import type { Owner } from "akasha/page/type/properties/owner.relation-property.types.ts"
import type { PageBadgeComponent } from "akasha/page/type/properties/page-badge-component.component-property-group.ts"
import type { PageCardComponent } from "akasha/page/type/properties/page-card-component.component-property-group.ts"
import type { PageComponent } from "akasha/page/type/properties/page-component.component-property-group.ts"
import type { PageRowComponent } from "akasha/page/type/properties/page-row-component.component-property-group.ts"
import type { PluralSlug } from "akasha/page/type/properties/plural-slug.text-property.types.ts"
import type { Properties } from "akasha/page/type/properties/properties.one-of-property.types.ts"
import type { PropertyBadgeComponent } from "akasha/page/type/properties/property-badge-component.component-property-group.ts"
import type { PropertyRowComponent } from "akasha/page/type/properties/property-row-component.component-property-group.ts"
import type { RunsTabooCheck } from "akasha/page/type/properties/runs-taboo-check.boolean-property.types.ts"
import type { Schema } from "akasha/page/type/properties/schema.file-property.types.ts"
import type { Sequence } from "akasha/page/type/properties/sequence.record-property.types.ts"
import type { Shapes } from "akasha/page/type/properties/shapes.file-property.types.ts"
import type { TitleColoredBy } from "akasha/page/type/properties/title-colored-by.relation-property.types.ts"
import type { Types } from "akasha/page/type/properties/types.file-property.types.ts"
import type { HashIndexed } from "akasha/temper/player/character/build/build-hash/properties/hash-indexed.text-property.types.ts"

export type PageType = Domain & {
  extends: ExtendsType
  properties?: Properties
  mortal?: Mortal
  loadedBy?: LoadedBy
  detailConfig?: DetailConfig
  mediaConfig?: MediaConfig
  sequence?: Sequence
  runsTabooCheck?: RunsTabooCheck
  allowsTmpPaths?: AllowsTmpPaths
  owner?: Owner
  types?: Types
  pageComponent?: PageComponent
  pageBadgeComponent?: PageBadgeComponent
  pageRowComponent?: PageRowComponent
  pageCardComponent?: PageCardComponent
  propertyBadgeComponent?: PropertyBadgeComponent
  propertyRowComponent?: PropertyRowComponent
  drawnOffline?: DrawnOffline
  schema?: Schema
  shapes?: Shapes
  pluralSlug?: PluralSlug
  loadedExport?: LoadedExport
  values?: SelectValues
  optionColors?: SelectOptionColors
  titleColoredBy?: TitleColoredBy
  hashIndexed?: HashIndexed
  bodyPropertyId?: BodyPropertyId
}
