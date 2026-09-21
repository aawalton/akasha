import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMyUniverseSugaSRemix = {
  id: "01a0676a-d725-703b-a3f8-22041c5c5bf2",
  type: "page-type/release",
  slug: "coldplay-my-universe-suga-s-remix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3oWWeH4gpNsJG0KyGaBoEd",
      externalLink: "https://open.spotify.com/album/3oWWeH4gpNsJG0KyGaBoEd",
    },
  ],
  title: "My Universe (SUGA's Remix)",
} as const satisfies Release
