import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayUpUpFreedoRemix = {
  id: "01a0676a-d72f-7056-9e81-190e97c77ef8",
  type: "page-type/release",
  slug: "coldplay-up-up-freedo-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2016-09-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "46ElgN92j4wktUnUkxUFKR",
      externalLink: "https://open.spotify.com/album/46ElgN92j4wktUnUkxUFKR",
    },
  ],
  title: "Up&Up (Freedo Remix)",
} as const satisfies Release
