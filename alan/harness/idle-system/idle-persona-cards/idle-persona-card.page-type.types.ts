import type { Page } from "../../../../pages/page.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"
import type { CardPersona } from "./properties/card-persona.relation-property.ts"
import type { CardRank } from "./properties/card-rank.number-property.ts"
import type { CardSlug } from "./properties/card-slug.text-property.ts"
import type { CoverImageId } from "./properties/cover-image-id.text-property.ts"
import type { Images } from "./properties/images.text-property.ts"
import type { LockEligible } from "./properties/lock-eligible.boolean-property.ts"
import type { LockState } from "./properties/lock-state.select-property.ts"
import type { PlayerId } from "./properties/player-id.text-property.ts"
import type { RatePerSec } from "./properties/rate-per-sec.number-property.ts"
import type { SeatIndex } from "./properties/seat-index.number-property.ts"
import type { SpecializeLocked } from "./properties/specialize-locked.boolean-property.ts"
import type { Stars } from "./properties/stars.number-property.ts"
import type { TrainCost } from "./properties/train-cost.number-property.ts"

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
