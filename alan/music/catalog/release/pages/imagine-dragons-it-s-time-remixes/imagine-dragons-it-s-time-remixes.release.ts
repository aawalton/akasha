import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const imagineDragonsItSTimeRemixes = {
  id: "01a0676a-d722-7016-ba9a-585b06e93c60",
  type: "page-type/release",
  slug: "imagine-dragons-it-s-time-remixes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/imagine-dragons"],
  position: 0,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5RO33QZORXxIKqneSZNuyl",
      externalLink: "https://open.spotify.com/album/5RO33QZORXxIKqneSZNuyl",
    },
  ],
  title: "It's Time Remixes",
} as const satisfies Release
