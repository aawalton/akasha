import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayMusicOfTheSpheres = {
  id: "01a0676a-d725-701d-84b5-efcebbf88ce0",
  type: "page-type/release",
  slug: "coldplay-music-of-the-spheres",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-10-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06mXfvDsRZNfnsGZvX2zpb",
      externalLink: "https://open.spotify.com/album/06mXfvDsRZNfnsGZvX2zpb",
    },
  ],
  title: "Music Of The Spheres",
} as const satisfies Release
