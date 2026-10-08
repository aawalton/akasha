import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const japaneseBreakfastSpotifySingles = {
  id: "01a0676a-d72a-7008-b133-43eff68419e7",
  type: "page-type/release",
  slug: "japanese-breakfast-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/japanese-breakfast"],
  position: 0,
  ownLength: 7.95795,
  ownProgress: 7.95795,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-04-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "132C8QdLHNKEqAUrXiJFlk",
      externalLink: "https://open.spotify.com/album/132C8QdLHNKEqAUrXiJFlk",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
