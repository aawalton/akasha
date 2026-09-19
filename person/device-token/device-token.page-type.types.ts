import type { Page } from "akasha/page/page.page-type.types.ts"
import type { DeviceTokenIosApp } from "akasha/person/device-token/properties/device-token-ios-app.relation-property.types.ts"
import type { DeviceTokenLastSeenAt } from "akasha/person/device-token/properties/device-token-last-seen-at.instant-property.types.ts"
import type { DeviceTokenPerson } from "akasha/person/device-token/properties/device-token-person.relation-property.types.ts"
import type { DeviceTokenPushType } from "akasha/person/device-token/properties/device-token-push-type.text-property.types.ts"
import type { DeviceTokenToken } from "akasha/person/device-token/properties/device-token-token.text-property.types.ts"

export type DeviceToken = Page & {
  person: DeviceTokenPerson
  iosApp: DeviceTokenIosApp
  token: DeviceTokenToken
  pushType?: DeviceTokenPushType
  lastSeenAt?: DeviceTokenLastSeenAt
}
