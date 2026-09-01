import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type IosAppSlug = Slug

export const deviceTokenIosAppSlug = {
  id: "01a05dc7-77db-7e0b-a9c2-97d83c1cd9fd",
  pageTypeSlug: "relation-property",
  slug: "device-token-ios-app-slug",
  propertySlug: "ios-app-slug",
  definition: "the app a push reaches on the device holding a token",
  targetPageTypeSlug: "page-type/ios-app",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bundle a push is addressed to is read from the app rather than kept here.",
    },
  ],
} as const satisfies RelationProperty
