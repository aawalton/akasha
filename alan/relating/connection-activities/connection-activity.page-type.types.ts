import type { Page } from "../../../pages/page.page-type.types.ts"
import type { Title } from "../../../pages/properties/title.text-property.ts"
import type { ConnectionActivityAttn } from "./properties/connection-activity-attn.number-property.ts"
import type { ConnectionActivityAttractiveness } from "./properties/connection-activity-attractiveness.number-property.ts"
import type { ConnectionActivityCategory } from "./properties/connection-activity-category.select-property.ts"
import type { ConnectionActivityEnergy } from "./properties/connection-activity-energy.number-property.ts"
import type { ConnectionActivityFemininity } from "./properties/connection-activity-femininity.number-property.ts"
import type { ConnectionActivityFitness } from "./properties/connection-activity-fitness.number-property.ts"
import type { ConnectionActivityIdent } from "./properties/connection-activity-ident.number-property.ts"
import type { ConnectionActivityIntensity } from "./properties/connection-activity-intensity.number-property.ts"
import type { ConnectionActivityKindness } from "./properties/connection-activity-kindness.number-property.ts"
import type { ConnectionActivityMaturity } from "./properties/connection-activity-maturity.number-property.ts"
import type { ConnectionActivityModality } from "./properties/connection-activity-modality.select-property.ts"
import type { ConnectionActivityModelBasis } from "./properties/connection-activity-model-basis.select-property.ts"
import type { ConnectionActivityNovelty } from "./properties/connection-activity-novelty.number-property.ts"
import type { ConnectionActivityPositivity } from "./properties/connection-activity-positivity.number-property.ts"
import type { ConnectionActivityReality } from "./properties/connection-activity-reality.select-property.ts"
import type { ConnectionActivityRepeatable } from "./properties/connection-activity-repeatable.boolean-property.ts"
import type { ConnectionActivitySafety } from "./properties/connection-activity-safety.select-property.ts"
import type { ConnectionActivitySeq } from "./properties/connection-activity-seq.number-property.ts"
import type { ConnectionActivityWeight } from "./properties/connection-activity-weight.number-property.ts"
import type { ConnectionActivityWit } from "./properties/connection-activity-wit.number-property.ts"

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
