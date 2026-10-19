import type { PlaidItemAccessToken } from "akasha/alan/harness/money/plaid-item/properties/plaid-item-access-token.text-property.types.ts"
import type { PlaidItemClientId } from "akasha/alan/harness/money/plaid-item/properties/plaid-item-client-id.text-property.types.ts"
import type { PlaidItemSecret } from "akasha/alan/harness/money/plaid-item/properties/plaid-item-secret.text-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type PlaidItem = Page & {
  clientId?: PlaidItemClientId
  secret?: PlaidItemSecret
  accessToken?: PlaidItemAccessToken
}
