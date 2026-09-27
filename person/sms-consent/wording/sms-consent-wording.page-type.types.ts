import type { Page } from "akasha/page/page.page-type.types.ts"
import type { Description } from "akasha/page/properties/description.text-property.types.ts"
import type { Title } from "akasha/page/properties/title.text-property.types.ts"
import type { SmsConsentTextVersion } from "akasha/person/sms-consent/properties/sms-consent-text-version.text-property.types.ts"

export type SmsConsentWording = Page & {
  title: Title
  description: Description
  consentTextVersion: SmsConsentTextVersion
}
