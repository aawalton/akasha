import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billyJoelSongsInTheAttic = {
  id: "01a0676a-d729-7067-96e1-4a3c03eb015c",
  type: "page-type/release",
  slug: "billy-joel-songs-in-the-attic",
  title: "Songs In the Attic",
  partOfCollections: ["artist/billy-joel"],
  position: 0,
  ownLength: 48.137733,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1981-09-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Vf4bohoWVk1YlPR2uNOFd",
      externalLink: "https://open.spotify.com/album/2Vf4bohoWVk1YlPR2uNOFd",
    },
  ],
} as const satisfies Release
