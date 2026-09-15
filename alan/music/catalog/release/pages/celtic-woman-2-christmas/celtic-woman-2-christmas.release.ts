import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2Christmas = {
  id: "01a0676a-d71a-7031-8ff0-23bc27f8ad60",
  type: "release",
  slug: "celtic-woman-2-christmas",
  title: "Christmas",
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  ownLength: 40.876183,
  ownProgress: 40.876183,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1YNjWBDQJSsQK8J5itLP0V",
      externalLink: "https://open.spotify.com/album/1YNjWBDQJSsQK8J5itLP0V",
    },
  ],
} as const satisfies Release
