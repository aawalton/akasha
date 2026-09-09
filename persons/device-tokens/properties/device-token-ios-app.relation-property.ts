import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "@akasha/pages/relation-property"

export type IosAppSlug = Slug

export const deviceTokenIosApp = {
  id: "01a05dc7-77db-7e0b-a9c2-97d83c1cd9fd",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "device-token-ios-app",
  propertySlug: "ios-app",
  definition: "the app a push reaches on the device with a token",
  targetPageType: "page-type/ios-app",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle a push is addressed to is read from the app rather than kept here.",
    },
  ],
} as const satisfies RelationProperty
