import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayParachutes = {
  id: "01a0676a-d726-705b-8a31-c95ea7dac055",
  type: "page-type/release",
  slug: "coldplay-parachutes",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2000-07-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ZG5lRT77aJ3btmArcykra",
      externalLink: "https://open.spotify.com/album/6ZG5lRT77aJ3btmArcykra",
    },
  ],
  title: "Parachutes",
} as const satisfies Release
