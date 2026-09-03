import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type RoyalRoadAccount = Page

export const royalRoadAccount = {
  id: "01a06838-e8da-73c2-8412-6234b402ec6a",
  pageTypeSlug: "page-type",
  slug: "royal-road-account",
  definition: "the login the Royal Road sync reads Alan's follow list from",
  pluralSlug: "royal-road-accounts",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An account is the sign-in rather than any story reached through it.",
    },
    {
      invariantKind: "departure",
      statement: "What authorises an account's sign-in is held as a secret rather than as text.",
    },
    {
      invariantKind: "gap",
      statement: "The sync signs in as no account and reads only what is open to anyone.",
    },
    {
      invariantKind: "gap",
      statement: "What an account signs in as stands in the cluster's secrets too.",
    },
  ],
} as const satisfies PageType
