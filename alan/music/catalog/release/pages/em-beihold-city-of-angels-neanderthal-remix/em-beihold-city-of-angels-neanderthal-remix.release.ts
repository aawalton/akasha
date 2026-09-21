import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const emBeiholdCityOfAngelsNeanderthalRemix = {
  id: "01a0676a-d71a-7053-a4b2-2a84f28ebf0b",
  type: "page-type/release",
  slug: "em-beihold-city-of-angels-neanderthal-remix",
  title: "City of Angels (Neanderthal Remix)",
  partOfCollections: ["artist/em-beihold"],
  position: 0,
  ownLength: 3.5,
  ownProgress: 3.5,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2020-09-25",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70Bx3bDPHiOO2K9OUDIIpR",
      externalLink: "https://open.spotify.com/album/70Bx3bDPHiOO2K9OUDIIpR",
    },
  ],
} as const satisfies Release
