import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { DeviceTokenIosApp } from "akasha/persons/device-tokens/properties/device-token-ios-app.relation-property.types.ts"
import type { DeviceTokenLastSeenAt } from "akasha/persons/device-tokens/properties/device-token-last-seen-at.instant-property.types.ts"
import type { DeviceTokenPerson } from "akasha/persons/device-tokens/properties/device-token-person.relation-property.types.ts"
import type { DeviceTokenToken } from "akasha/persons/device-tokens/properties/device-token-token.text-property.types.ts"

export type DeviceToken = Page & {
  person: DeviceTokenPerson
  iosApp: DeviceTokenIosApp
  token: DeviceTokenToken
  lastSeenAt?: DeviceTokenLastSeenAt
}
