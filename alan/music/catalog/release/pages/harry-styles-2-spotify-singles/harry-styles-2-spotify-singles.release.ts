import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const harryStyles2SpotifySingles = {
  id: "01a0676a-d72a-7003-a8cf-f87b284420b8",
  type: "page-type/release",
  slug: "harry-styles-2-spotify-singles",
  title: "Spotify Singles",
  partOfCollections: ["artist/harry-styles"],
  position: 0,
  ownLength: 7.800983,
  ownProgress: 7.800983,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-09-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7neiWgd56IO7vi2cRUP8Tj",
      externalLink: "https://open.spotify.com/album/7neiWgd56IO7vi2cRUP8Tj",
    },
  ],
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-15T16:36:07.000Z",
} as const satisfies Release
