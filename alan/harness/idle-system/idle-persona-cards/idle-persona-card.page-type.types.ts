import type { CardPersona } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/card-persona.relation-property.types.ts"
import type { CardRank } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/card-rank.number-property.types.ts"
import type { CardSlug } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/card-slug.text-property.types.ts"
import type { CoverImageId } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/cover-image-id.text-property.types.ts"
import type { Images } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/images.text-property.types.ts"
import type { LockEligible } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/lock-eligible.boolean-property.types.ts"
import type { LockState } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/lock-state.select-property.types.ts"
import type { PlayerId } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/player-id.text-property.types.ts"
import type { RatePerSec } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/rate-per-sec.number-property.types.ts"
import type { SeatIndex } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/seat-index.number-property.types.ts"
import type { SpecializeLocked } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/specialize-locked.boolean-property.types.ts"
import type { Stars } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/stars.number-property.types.ts"
import type { TrainCost } from "akasha/alan/harness/idle-system/idle-persona-cards/properties/train-cost.number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { Title } from "akasha/pages/properties/title.text-property.types.ts"

export type IdlePersonaCard = Page & {
  title: Title
  playerId: PlayerId
  cardSlug: CardSlug
  stars: Stars
  ratePerSec: RatePerSec
  rank: CardRank
  trainCost: TrainCost
  lockState: LockState
  lockEligible: LockEligible
  specializeLocked: SpecializeLocked
  persona?: CardPersona
  coverImageId?: CoverImageId
  images?: Images
  seatIndex?: SeatIndex
}
