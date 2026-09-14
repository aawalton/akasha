import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const harryStyles2SpotifySingles = {
  id: "01a0676a-d72a-7003-a8cf-f87b284420b8",
  type: "release",
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
} as const satisfies Release
