import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2HomeForChristmas = {
  id: "01a0676a-d720-7052-8abb-708db552a904",
  type: "release",
  slug: "celtic-woman-2-home-for-christmas",
  title: "Home For Christmas",
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  ownLength: 45.53485,
  ownProgress: 45.53485,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "35BraU46wN6VdKw3qJJge4",
      externalLink: "https://open.spotify.com/album/35BraU46wN6VdKw3qJJge4",
    },
  ],
} as const satisfies Release
