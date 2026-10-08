import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const elvisPresley2HarumScarum = {
  id: "01a0676a-d71f-7058-a839-bbf973ee1acf",
  type: "page-type/release",
  slug: "elvis-presley-2-harum-scarum",
  title: "Harum Scarum",
  partOfCollections: ["artist/elvis-presley"],
  position: 0,
  ownLength: 24.441483,
  ownProgress: 24.441483,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1965-11-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0DDokriMy7L6hseGI6Ju7C",
      externalLink: "https://open.spotify.com/album/0DDokriMy7L6hseGI6Ju7C",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-15T16:35:10.000Z",
} as const satisfies Release
