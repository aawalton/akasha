import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const jennaRaineGoodGrief = {
  id: "01a0676a-d71f-701c-94ec-df5f14810ec4",
  type: "page-type/release",
  slug: "jenna-raine-good-grief",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/jenna-raine"],
  position: 0,
  publishedAt: "2025-03-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4PM14CRnzdPXc4BxHIWXP2",
      externalLink: "https://open.spotify.com/album/4PM14CRnzdPXc4BxHIWXP2",
    },
  ],
  title: "Good Grief",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-21T23:00:38.000Z",
} as const satisfies Release
