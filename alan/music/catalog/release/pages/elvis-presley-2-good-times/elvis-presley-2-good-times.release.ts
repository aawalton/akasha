import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2GoodTimes = {
  id: "01a0676a-d71f-701f-87e2-3b33caa5db58",
  type: "page-type/release",
  slug: "elvis-presley-2-good-times",
  title: "Good Times",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 29.70705,
  ownProgress: 29.70705,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1974-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bVlE6dhJEsCzCX2CWrOCw",
      externalLink: "https://open.spotify.com/album/0bVlE6dhJEsCzCX2CWrOCw",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
