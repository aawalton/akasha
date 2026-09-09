import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { RoyalRoadEmail } from "./properties/royal-road-email.email-address-property.ts"
import type { RoyalRoadPassword } from "./properties/royal-road-password.text-property.ts"

export type RoyalRoadAccount = Page & {
  email: RoyalRoadEmail
  password?: RoyalRoadPassword
}

export const royalRoadAccount = {
  id: "01a06838-e8da-73c2-8412-6234b402ec6a",
  pageTypeSlug: "page-type",
  slug: "royal-road-account",
  definition: "the login the Royal Road sync reads Alan's follow list from",
  pluralSlug: "royal-road-accounts",
  extends: ["page-type/page"],
  partSlugs: ["email-address-property/royal-road-email", "text-property/royal-road-password"],
  properties: [
    { pagePropertySlug: "email-address-property/royal-road-email", required: true, many: false },
    {
      pagePropertySlug: "text-property/royal-road-password",
      required: true,
      many: false,
      secret: true,
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account is the sign-in rather than any story reached through that account.",
    },
    {
      invariantKind: "departure",
      statement:
        "The password authorising an account's sign-in is held as a secret rather than as text.",
    },
    {
      invariantKind: "departure",
      statement:
        "An account is reached by its slug rather than by the address that account signs in as.",
    },
    {
      invariantKind: "gap",
      statement: "The sync signs in as no account and reads only the pages open to anyone.",
    },
    {
      invariantKind: "gap",
      statement: "The address an account signs in as is in the cluster's secrets too.",
    },
  ],
} as const satisfies PageType
