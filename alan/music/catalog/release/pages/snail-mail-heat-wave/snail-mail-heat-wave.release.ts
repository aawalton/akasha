import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const snailMailHeatWave = {
  id: "01a0676a-d720-701a-9927-be79a67ac08f",
  type: "page-type/release",
  slug: "snail-mail-heat-wave",
  title: "Heat Wave",
  partOfCollections: ["artist/snail-mail"],
  position: 0,
  ownLength: 5.1391,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-04-26",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64OReU7oQGcjfAFvkL8Rx9",
      externalLink: "https://open.spotify.com/album/64OReU7oQGcjfAFvkL8Rx9",
    },
  ],
} as const satisfies Release
