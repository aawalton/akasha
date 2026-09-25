import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theLoneGunmen2001 = {
  id: "01a06802-9332-704a-8a48-3500c96e9004",
  type: "page-type/show",
  slug: "the-lone-gunmen-2001",
  title: "The Lone Gunmen (2001)",
  partOfCollections: ["show-collection/x-files"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-03-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-lone-gunmen",
      externalLink: "https://trakt.tv/shows/the-lone-gunmen",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Show
