import type { Id } from "akasha/page/properties/id.text-property.types.ts"
import type { ContributionPointAt } from "akasha/product/kofi/contributor/properties/contribution-point-at.instant-property.types.ts"
import type { ContributionPoints } from "akasha/product/kofi/contributor/properties/contribution-points.number-property.types.ts"
import type { StripeChargeId } from "akasha/product/kofi/contributor/properties/stripe-charge-id.text-property.types.ts"

export type ContributionPointTransactions = "jsonl"

export type ContributionPointTransactionsRow = {
  id: Id
  at: ContributionPointAt
  points: ContributionPoints
  stripeChargeId?: StripeChargeId
}
