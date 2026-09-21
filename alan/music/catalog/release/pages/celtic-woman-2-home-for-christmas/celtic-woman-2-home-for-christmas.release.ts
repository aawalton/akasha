import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2HomeForChristmas = {
  id: "01a0676a-d720-7052-8abb-708db552a904",
  type: "page-type/release",
  slug: "celtic-woman-2-home-for-christmas",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "35BraU46wN6VdKw3qJJge4",
      externalLink: "https://open.spotify.com/album/35BraU46wN6VdKw3qJJge4",
    },
  ],
  title: "Home For Christmas",
} as const satisfies Release
