import type { Page } from "akasha/page/page.page-type.types.ts"
import type { ContributorEmailHash } from "akasha/product/kofi/contributor/properties/contributor-email-hash.text-property.types.ts"

export type Contributor = Page & {
  emailHash: ContributorEmailHash
}
