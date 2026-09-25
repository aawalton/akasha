import type { ConnectionActivityAttn } from "akasha/alan/relationships/connection-activity/properties/connection-activity-attn.number-property.types.ts"
import type { ConnectionActivityAttractiveness } from "akasha/alan/relationships/connection-activity/properties/connection-activity-attractiveness.number-property.types.ts"
import type { ConnectionActivityCategory } from "akasha/alan/relationships/connection-activity/properties/connection-activity-category.select-property.types.ts"
import type { ConnectionActivityEnergy } from "akasha/alan/relationships/connection-activity/properties/connection-activity-energy.number-property.types.ts"
import type { ConnectionActivityFemininity } from "akasha/alan/relationships/connection-activity/properties/connection-activity-femininity.number-property.types.ts"
import type { ConnectionActivityFitness } from "akasha/alan/relationships/connection-activity/properties/connection-activity-fitness.number-property.types.ts"
import type { ConnectionActivityIdent } from "akasha/alan/relationships/connection-activity/properties/connection-activity-ident.number-property.types.ts"
import type { ConnectionActivityIntensity } from "akasha/alan/relationships/connection-activity/properties/connection-activity-intensity.number-property.types.ts"
import type { ConnectionActivityKindness } from "akasha/alan/relationships/connection-activity/properties/connection-activity-kindness.number-property.types.ts"
import type { ConnectionActivityMaturity } from "akasha/alan/relationships/connection-activity/properties/connection-activity-maturity.number-property.types.ts"
import type { ConnectionActivityModality } from "akasha/alan/relationships/connection-activity/properties/connection-activity-modality.select-property.types.ts"
import type { ConnectionActivityModelBasis } from "akasha/alan/relationships/connection-activity/properties/connection-activity-model-basis.select-property.types.ts"
import type { ConnectionActivityNovelty } from "akasha/alan/relationships/connection-activity/properties/connection-activity-novelty.number-property.types.ts"
import type { ConnectionActivityPositivity } from "akasha/alan/relationships/connection-activity/properties/connection-activity-positivity.number-property.types.ts"
import type { ConnectionActivityReality } from "akasha/alan/relationships/connection-activity/properties/connection-activity-reality.select-property.types.ts"
import type { ConnectionActivityRepeatable } from "akasha/alan/relationships/connection-activity/properties/connection-activity-repeatable.boolean-property.types.ts"
import type { ConnectionActivitySafety } from "akasha/alan/relationships/connection-activity/properties/connection-activity-safety.select-property.types.ts"
import type { ConnectionActivitySeq } from "akasha/alan/relationships/connection-activity/properties/connection-activity-seq.number-property.types.ts"
import type { ConnectionActivityWeight } from "akasha/alan/relationships/connection-activity/properties/connection-activity-weight.number-property.types.ts"
import type { ConnectionActivityWit } from "akasha/alan/relationships/connection-activity/properties/connection-activity-wit.number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"

export type ConnectionActivity = Page & {
  title: Title
  connectionActivityAttn: ConnectionActivityAttn
  connectionActivityAttractiveness: ConnectionActivityAttractiveness
  connectionActivityCategory: ConnectionActivityCategory
  connectionActivityEnergy: ConnectionActivityEnergy
  connectionActivityFemininity: ConnectionActivityFemininity
  connectionActivityFitness: ConnectionActivityFitness
  connectionActivityIdent: ConnectionActivityIdent
  connectionActivityIntensity: ConnectionActivityIntensity
  connectionActivityKindness: ConnectionActivityKindness
  connectionActivityMaturity: ConnectionActivityMaturity
  connectionActivityModality: ConnectionActivityModality
  connectionActivityModelBasis: ConnectionActivityModelBasis
  connectionActivityNovelty: ConnectionActivityNovelty
  connectionActivityPositivity: ConnectionActivityPositivity
  connectionActivityReality: ConnectionActivityReality
  connectionActivityRepeatable: ConnectionActivityRepeatable
  connectionActivitySafety: ConnectionActivitySafety
  connectionActivityWeight: ConnectionActivityWeight
  connectionActivityWit: ConnectionActivityWit
  connectionActivitySeq: ConnectionActivitySeq
}
