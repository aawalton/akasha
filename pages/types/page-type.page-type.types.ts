import type { Domain } from "akasha/domains/domain.page-type.types.ts"
import type { AllowsTmpPaths } from "akasha/pages/types/properties/allows-tmp-paths.boolean-property.types.ts"
import type { Carried } from "akasha/pages/types/properties/carried.file-property.types.ts"
import type { DetailConfig } from "akasha/pages/types/properties/detail-config.record-property.types.ts"
import type { DrawnOffline } from "akasha/pages/types/properties/drawn-offline.boolean-property.types.ts"
import type { ExtendsType } from "akasha/pages/types/properties/extends-type.relation-property.types.ts"
import type { LoadedBy } from "akasha/pages/types/properties/loaded-by.relation-property.types.ts"
import type { MediaConfig } from "akasha/pages/types/properties/media-config.record-property.types.ts"
import type { Mortal } from "akasha/pages/types/properties/mortal.boolean-property.types.ts"
import type { NextSeq } from "akasha/pages/types/properties/next-seq.number-property.types.ts"
import type { Owner } from "akasha/pages/types/properties/owner.relation-property.types.ts"
import type { PageBadgeComponent } from "akasha/pages/types/properties/page-badge-component.component-property-group.ts"
import type { PageCardComponent } from "akasha/pages/types/properties/page-card-component.component-property-group.ts"
import type { PageComponent } from "akasha/pages/types/properties/page-component.component-property-group.ts"
import type { PageRowComponent } from "akasha/pages/types/properties/page-row-component.component-property-group.ts"
import type { Properties } from "akasha/pages/types/properties/properties.one-of-property.types.ts"
import type { PropertyBadgeComponent } from "akasha/pages/types/properties/property-badge-component.component-property-group.ts"
import type { PropertyRowComponent } from "akasha/pages/types/properties/property-row-component.component-property-group.ts"
import type { RunsTabooCheck } from "akasha/pages/types/properties/runs-taboo-check.boolean-property.types.ts"
import type { Sequence } from "akasha/pages/types/properties/sequence.record-property.types.ts"
import type { TypeGenerator } from "akasha/pages/types/properties/type-generator.file-property.types.ts"
import type { Types } from "akasha/pages/types/properties/types.file-property.types.ts"

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
  nextSeq?: NextSeq
  owner?: Owner
  typeGenerator?: TypeGenerator
  types?: Types
  pageComponent?: PageComponent
  pageBadgeComponent?: PageBadgeComponent
  pageRowComponent?: PageRowComponent
  pageCardComponent?: PageCardComponent
  propertyBadgeComponent?: PropertyBadgeComponent
  propertyRowComponent?: PropertyRowComponent
  drawnOffline?: DrawnOffline
  carried?: Carried
}
