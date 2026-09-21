import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const celticWoman2TheDawningOfTheDay = {
  id: "01a0676a-d72c-7046-891d-89450edbec52",
  type: "page-type/release",
  slug: "celtic-woman-2-the-dawning-of-the-day",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/celtic-woman"],
  position: 0,
  publishedAt: "2021-09-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7hGwDgIOXOeyxX2116qiEM",
      externalLink: "https://open.spotify.com/album/7hGwDgIOXOeyxX2116qiEM",
    },
  ],
  title: "The Dawning Of The Day",
} as const satisfies Release
