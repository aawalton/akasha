import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixItSBeenALongLongTime = {
  id: "01a0676a-d722-700b-87a7-7962eb3c2b20",
  type: "page-type/release",
  slug: "pentatonix-it-s-been-a-long-long-time",
  title: "It's Been A Long, Long Time",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 1.129767,
  ownProgress: 1.129767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-09-27",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5CBhIk6ynI75VsLEjrpH77",
      externalLink: "https://open.spotify.com/album/5CBhIk6ynI75VsLEjrpH77",
    },
  ],
} as const satisfies Release
