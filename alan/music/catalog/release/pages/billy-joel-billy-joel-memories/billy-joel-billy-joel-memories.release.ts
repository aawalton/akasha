import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelBillyJoelMemories = {
  id: "01a0676a-d719-7003-a7e2-2f34584d49f4",
  type: "page-type/release",
  slug: "billy-joel-billy-joel-memories",
  title: "Billy Joel - Memories",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 22.6455,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-06-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2lr4ERVomwpt84yPlAliAR",
      externalLink: "https://open.spotify.com/album/2lr4ERVomwpt84yPlAliAR",
    },
  ],
} as const satisfies Release
