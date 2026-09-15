import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2TheDawningOfTheDay = {
  id: "01a0676a-d72c-7046-891d-89450edbec52",
  type: "release",
  slug: "celtic-woman-2-the-dawning-of-the-day",
  title: "The Dawning Of The Day",
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  ownLength: 3.904,
  ownProgress: 3.904,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-10",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hGwDgIOXOeyxX2116qiEM",
      externalLink: "https://open.spotify.com/album/7hGwDgIOXOeyxX2116qiEM",
    },
  ],
} as const satisfies Release
