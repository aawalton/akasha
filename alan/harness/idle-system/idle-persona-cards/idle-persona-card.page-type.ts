import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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

export const idlePersonaCard = {
  id: "01a06596-f0d5-700c-a792-6d23205f3082",
  pageTypeSlug: "page-type",
  slug: "idle-persona-card",
  definition: "one persona as one player holds her in the idle game",
  pluralSlug: "idle-persona-cards",
  extends: ["page-type/page"],
  parts: [
    "boolean-property/lock-eligible",
    "boolean-property/specialize-locked",
    "number-property/card-rank",
    "number-property/rate-per-sec",
    "number-property/seat-index",
    "number-property/stars",
    "number-property/train-cost",
    "relation-property/card-persona",
    "select-property/lock-state",
    "text-property/card-slug",
    "text-property/cover-image-id",
    "text-property/images",
    "text-property/player-id",
  ],
  properties: [
    { pagePropertySlug: "text-property/title", required: true, many: false },
    { pagePropertySlug: "text-property/player-id", required: true, many: false },
    { pagePropertySlug: "text-property/card-slug", required: true, many: false },
    { pagePropertySlug: "number-property/stars", required: true, many: false },
    { pagePropertySlug: "number-property/rate-per-sec", required: true, many: false },
    { pagePropertySlug: "number-property/card-rank", required: true, many: false },
    { pagePropertySlug: "number-property/train-cost", required: true, many: false },
    { pagePropertySlug: "select-property/lock-state", required: true, many: false },
    { pagePropertySlug: "boolean-property/lock-eligible", required: true, many: false },
    { pagePropertySlug: "boolean-property/specialize-locked", required: true, many: false },
    { pagePropertySlug: "relation-property/card-persona", required: false, many: false },
    { pagePropertySlug: "text-property/cover-image-id", required: false, many: false },
    { pagePropertySlug: "text-property/images", required: false, many: true, maxCount: null },
    { pagePropertySlug: "number-property/seat-index", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One player and one card is one page.",
    },
    {
      invariantKind: "departure",
      statement: "A card is slugged by the card slug and then the player with that card.",
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
