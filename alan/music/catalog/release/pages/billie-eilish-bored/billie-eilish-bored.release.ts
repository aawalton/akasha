import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishBored = {
  id: "01a0676a-d719-7022-8669-66eb03d29e21",
  type: "page-type/release",
  slug: "billie-eilish-bored",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2017-03-30",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iyJ8i3eKbez8JXDbsHIdZ",
      externalLink: "https://open.spotify.com/album/4iyJ8i3eKbez8JXDbsHIdZ",
    },
  ],
  title: "Bored",
} as const satisfies Release
