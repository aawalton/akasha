import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishMyFuture = {
  id: "01a0676a-d725-702a-bc7d-247437f76bba",
  type: "page-type/release",
  slug: "billie-eilish-my-future",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2020-07-30",
  rank: "B",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oxhQpF3Twbkl18oQYfnh5",
      externalLink: "https://open.spotify.com/album/3oxhQpF3Twbkl18oQYfnh5",
    },
  ],
  title: "my future",
} as const satisfies Release
