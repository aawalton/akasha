import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
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

export const deviceToken = {
  id: "01a05dc7-77d9-7c93-878e-d93457c7db5f",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "device-token",
  definition: "where Apple delivers a push for one app on one device",
  pluralSlug: "device-tokens",
  extends: ["page-type/page"],
  mortal: true,
  parts: [
    "instant-property/device-token-last-seen-at",
    "relation-property/device-token-ios-app",
    "relation-property/device-token-person",
    "text-property/device-token-token",
  ],
  properties: [
    { pageProperty: "relation-property/device-token-person", required: true, many: false },
    {
      pageProperty: "relation-property/device-token-ios-app",
      required: true,
      many: false,
    },
    { pageProperty: "text-property/device-token-token", required: true, many: false },
    {
      pageProperty: "instant-property/device-token-last-seen-at",
      required: false,
      many: false,
      uncommitted: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A token Apple rejects is dropped rather than kept.",
    },
    {
      invariantKind: "departure",
      statement: "One device has a token for each app the device runs.",
    },
    {
      invariantKind: "departure",
      statement: "Registering a token again replaces the token that was there.",
    },
    {
      invariantKind: "departure",
      statement: "The app a push reaches is named rather than its bundle restated here.",
    },
    {
      invariantKind: "departure",
      statement: "The person is named rather than the account the person signed in under.",
    },
    {
      invariantKind: "departure",
      statement: "When a token was last seen is kept outside the commit.",
    },
  ],
} as const satisfies PageType
