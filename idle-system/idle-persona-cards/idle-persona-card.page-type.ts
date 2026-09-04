import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../temper/temper-things/properties/title.text-property.ts"
import type { CardPersonaSlug } from "./properties/card-persona-slug.relation-property.ts"
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
  personaSlug?: CardPersonaSlug
  coverImageId?: CoverImageId
  images?: Images
  seatIndex?: SeatIndex
}

export const idlePersonaCard = {
  id: "01a06596-f0d5-700c-a792-6d23205f3082",
  pageTypeSlug: "page-type",
  slug: "idle-persona-card",
  definition: "one persona as one player holds her in the idle game",
  pluralSlug: "idle-persona-cards",
  extendsSlug: "page-type/page",
  partSlugs: [
    "boolean-property/lock-eligible",
    "boolean-property/specialize-locked",
    "number-property/card-rank",
    "number-property/rate-per-sec",
    "number-property/seat-index",
    "number-property/stars",
    "number-property/train-cost",
    "relation-property/card-persona-slug",
    "select-property/lock-state",
    "text-property/card-slug",
    "text-property/cover-image-id",
    "text-property/images",
    "text-property/player-id",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "player-id", required: true, many: false },
    { pagePropertySlug: "card-slug", required: true, many: false },
    { pagePropertySlug: "stars", required: true, many: false },
    { pagePropertySlug: "rate-per-sec", required: true, many: false },
    { pagePropertySlug: "card-rank", required: true, many: false },
    { pagePropertySlug: "train-cost", required: true, many: false },
    { pagePropertySlug: "lock-state", required: true, many: false },
    { pagePropertySlug: "lock-eligible", required: true, many: false },
    { pagePropertySlug: "specialize-locked", required: true, many: false },
    { pagePropertySlug: "persona-slug", required: false, many: false },
    { pagePropertySlug: "cover-image-id", required: false, many: false },
    { pagePropertySlug: "images", required: false, many: true, max: null },
    { pagePropertySlug: "seat-index", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One player and one card is one page.",
    },
    {
      invariantKind: "departure",
      statement: "A card is slugged by the card it is and then the player who holds it.",
    },
    {
      invariantKind: "departure",
      statement: "The card alone is no name.",
    },
    {
      invariantKind: "departure",
      statement: "A card names its persona only once the card is unlocked.",
    },
  ],
} as const satisfies PageType
