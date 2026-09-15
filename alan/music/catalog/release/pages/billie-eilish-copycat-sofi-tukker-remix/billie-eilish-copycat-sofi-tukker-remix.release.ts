import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishCopycatSofiTukkerRemix = {
  id: "01a0676a-d71b-7028-b84c-385f85adfb21",
  type: "page-type/release",
  slug: "billie-eilish-copycat-sofi-tukker-remix",
  title: "COPYCAT (Sofi Tukker Remix)",
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  ownLength: 3.3114,
  ownProgress: 3.3114,
  unit: "unit/minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2018-01-12",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5XRJoC2QtsNbAubsCrBBbG",
      externalLink: "https://open.spotify.com/album/5XRJoC2QtsNbAubsCrBBbG",
    },
  ],
} as const satisfies Release
