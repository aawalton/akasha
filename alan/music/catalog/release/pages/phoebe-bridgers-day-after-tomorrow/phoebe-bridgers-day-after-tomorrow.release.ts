import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const phoebeBridgersDayAfterTomorrow = {
  id: "01a0676a-d71b-706c-ae42-16b9572602c0",
  type: "page-type/release",
  slug: "phoebe-bridgers-day-after-tomorrow",
  title: "Day After Tomorrow",
  partOfCollections: ["artist/phoebe-bridgers"],
  position: 0,
  ownLength: 17.76525,
  ownProgress: 17.76525,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2021-11-30",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nLUl1qxZ1CTd1fRGUg0G4",
      externalLink: "https://open.spotify.com/album/0nLUl1qxZ1CTd1fRGUg0G4",
    },
  ],
} as const satisfies Release
