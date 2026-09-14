import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const theBeatles2Anthology1 = {
  id: "01a0676a-d717-7021-94a4-6a955c38eba7",
  type: "release",
  slug: "the-beatles-2-anthology-1",
  title: "Anthology 1",
  partOfCollections: ["artist/the-beatles"],
  position: 0,
  ownLength: 123.033683,
  ownProgress: 123.033683,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1995-11-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1pBBIxK5yURfbv8Xd5lta1",
      externalLink: "https://open.spotify.com/album/1pBBIxK5yURfbv8Xd5lta1",
    },
  ],
} as const satisfies Release
