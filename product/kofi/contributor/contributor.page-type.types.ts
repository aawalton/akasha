import type { Page } from "akasha/page/page.page-type.types.ts"
import type { ContributionPointBalance } from "akasha/product/kofi/contributor/properties/contribution-point-balance.number-property.types.ts"
import type { ContributionPointTransactions } from "akasha/product/kofi/contributor/properties/contribution-point-transactions.page-property-entry.types.ts"
import type { ContributorEmailHash } from "akasha/product/kofi/contributor/properties/contributor-email-hash.text-property.types.ts"

export type Contributor = Page & {
  emailHash: ContributorEmailHash
  balance: ContributionPointBalance
  transactions: ContributionPointTransactions
}
