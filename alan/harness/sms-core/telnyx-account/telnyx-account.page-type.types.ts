import type { TelnyxAccountApiKey } from "akasha/alan/harness/sms-core/telnyx-account/properties/telnyx-account-api-key.text-property.types.ts"
import type { TelnyxAccountFromNumber } from "akasha/alan/harness/sms-core/telnyx-account/properties/telnyx-account-from-number.phone-number-property.types.ts"
import type { Page } from "akasha/page/page.page-type.types.ts"

export type TelnyxAccount = Page & {
  fromNumber: TelnyxAccountFromNumber
  apiKey?: TelnyxAccountApiKey
}
