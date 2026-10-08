import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishCopycatSofiTukkerRemix = {
  id: "01a0676a-d71b-7028-b84c-385f85adfb21",
  type: "page-type/release",
  slug: "billie-eilish-copycat-sofi-tukker-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2018-01-12",
  grade: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XRJoC2QtsNbAubsCrBBbG",
      externalLink: "https://open.spotify.com/album/5XRJoC2QtsNbAubsCrBBbG",
    },
  ],
  title: "COPYCAT (Sofi Tukker Remix)",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
