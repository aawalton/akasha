import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryWhatMakesAWoman = {
  id: "01a0676a-d730-704a-ae9e-b6c5684e379e",
  type: "page-type/release",
  slug: "katy-perry-what-makes-a-woman",
  title: "What Makes A Woman",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 2.18785,
  ownProgress: 2.18785,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2020-08-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6WwtlRrCrGP0u02Bf7p46T",
      externalLink: "https://open.spotify.com/album/6WwtlRrCrGP0u02Bf7p46T",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
