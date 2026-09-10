import type { Page } from "../../pages/page.page-type.types.ts"
import type { DeviceTokenIosApp } from "./properties/device-token-ios-app.relation-property.ts"
import type { DeviceTokenLastSeenAt } from "./properties/device-token-last-seen-at.instant-property.ts"
import type { DeviceTokenPerson } from "./properties/device-token-person.relation-property.ts"
import type { DeviceTokenToken } from "./properties/device-token-token.text-property.ts"

export type DeviceToken = Page & {
  person: DeviceTokenPerson
  iosApp: DeviceTokenIosApp
  token: DeviceTokenToken
  lastSeenAt?: DeviceTokenLastSeenAt
}
