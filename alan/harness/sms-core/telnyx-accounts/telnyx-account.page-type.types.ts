import type { TelnyxAccountApiKey } from "akasha/alan/harness/sms-core/telnyx-accounts/properties/telnyx-account-api-key.text-property.types.ts"
import type { TelnyxAccountFromNumber } from "akasha/alan/harness/sms-core/telnyx-accounts/properties/telnyx-account-from-number.phone-number-property.types.ts"
import type { Page } from "akasha/pages/page.page-type.types.ts"

export type TelnyxAccount = Page & {
  fromNumber: TelnyxAccountFromNumber
  apiKey?: TelnyxAccountApiKey
}
