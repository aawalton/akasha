import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const linkinParkWaitingForTheEnd = {
  id: "01a0676a-d730-700d-a1c5-a431bcca2563",
  type: "page-type/release",
  slug: "linkin-park-waiting-for-the-end",
  title: "Waiting for the End",
  partOfCollections: ["artist/linkin-park"],
  position: 0,
  ownLength: 11.874983,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-10-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6KntytDKDCI7jorIZM9Biq",
      externalLink: "https://open.spotify.com/album/6KntytDKDCI7jorIZM9Biq",
    },
  ],
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
