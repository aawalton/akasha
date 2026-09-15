import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenPassenger = {
  id: "01a0a59d-c949-76ec-bd9f-83d3162cbbbe",
  type: "page-type/release",
  slug: "alex-warren-passenger",
  ownLength: 2.66285,
  ownProgress: 0,
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  publishedAt: "2026-06-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZLVyO1GnQN35zYHbIB2bJ",
      externalLink: "https://open.spotify.com/album/6ZLVyO1GnQN35zYHbIB2bJ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "PASSENGER",
} as const satisfies Release
