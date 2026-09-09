import type { Page } from "../../../../pages/page.page-type.ts"
import type { TelnyxAccountApiKey } from "./properties/telnyx-account-api-key.text-property.ts"
import type { TelnyxAccountFromNumber } from "./properties/telnyx-account-from-number.phone-number-property.ts"

export type TelnyxAccount = Page & {
  fromNumber: TelnyxAccountFromNumber
  apiKey?: TelnyxAccountApiKey
}
