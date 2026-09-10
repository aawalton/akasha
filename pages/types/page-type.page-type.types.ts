import type { Domain } from "../../domains/domain.page-type.types.ts"
import type { PluralSlug } from "../../domains/properties/plural-slug.text-property.ts"
import type { AllowsTmpPaths } from "./properties/allows-tmp-paths.boolean-property.ts"
import type { DetailConfig } from "./properties/detail-config.record-property.ts"
import type { ExtendsType } from "./properties/extends-type.relation-property.ts"
import type { LoadedBy } from "./properties/loaded-by.relation-property.ts"
import type { MediaConfig } from "./properties/media-config.record-property.ts"
import type { Mortal } from "./properties/mortal.boolean-property.ts"
import type { NextSeq } from "./properties/next-seq.number-property.ts"
import type { Owner } from "./properties/owner.relation-property.ts"
import type { Properties } from "./properties/properties.record-property.ts"
import type { RunsTabooCheck } from "./properties/runs-taboo-check.boolean-property.ts"
import type { Sequence } from "./properties/sequence.record-property.ts"
import type { TypeGenerator } from "./properties/type-generator.file-property.ts"
import type { Types } from "./properties/types.file-property.ts"
import type { Worked } from "./properties/worked.file-property.ts"

export type PageType = Domain & {
  extends: ExtendsType
  properties?: Properties
  mortal?: Mortal
  pluralSlug: PluralSlug
  loadedBy?: LoadedBy
  detailConfig?: DetailConfig
  mediaConfig?: MediaConfig
  sequence?: Sequence
  runsTabooCheck?: RunsTabooCheck
  allowsTmpPaths?: AllowsTmpPaths
  nextSeq?: NextSeq
  owner?: Owner
  worked?: Worked
  typeGenerator?: TypeGenerator
  types?: Types
}
