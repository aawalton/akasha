import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const enyaADayWithoutRain = {
  id: "01a0676a-d715-7021-9dde-65dc7acc3eba",
  type: "page-type/release",
  slug: "enya-a-day-without-rain",
  title: "A Day Without Rain",
  partOfCollections: ["artist/enya"],
  position: 0,
  ownLength: 37.509233333333334,
  ownProgress: 37.509233,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2000-11-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ioso1tqQ5zABQDVYyiUi5",
      externalLink: "https://open.spotify.com/album/2ioso1tqQ5zABQDVYyiUi5",
    },
  ],
  createdAt: "2026-09-03T13:17:30.261Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Release
