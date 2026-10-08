import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jamesTaylor2ComingBackToYou = {
  id: "01a0676a-d71b-701e-aca8-ca7b3d89ecf1",
  type: "page-type/release",
  slug: "james-taylor-2-coming-back-to-you",
  title: "Coming Back To You",
  partOfCollections: ["artist/james-taylor"],
  position: 0,
  ownLength: 3.676667,
  ownProgress: 3.676667,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-07-28",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kHIm8MtwOa6jVGS4nFC31",
      externalLink: "https://open.spotify.com/album/5kHIm8MtwOa6jVGS4nFC31",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:36:36.000Z",
} as const satisfies Release
