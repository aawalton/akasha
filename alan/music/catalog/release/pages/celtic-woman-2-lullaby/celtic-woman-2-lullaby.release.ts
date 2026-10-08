import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Lullaby = {
  id: "01a0676a-d724-7012-9607-649d6d7340c8",
  type: "page-type/release",
  slug: "celtic-woman-2-lullaby",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2011-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pljjUZMChTDluIQVbdIXL",
      externalLink: "https://open.spotify.com/album/7pljjUZMChTDluIQVbdIXL",
    },
  ],
  title: "Lullaby",
  createdAt: "2026-09-03T13:17:30.276Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
