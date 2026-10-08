import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraWhatHappenedToTheHeartDeluxe = {
  id: "01a0676a-d730-7046-883f-e6439edf6922",
  type: "page-type/release",
  slug: "aurora-what-happened-to-the-heart-deluxe",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2025-05-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3W0VJHaitM1oDZ1QT5wFDx",
      externalLink: "https://open.spotify.com/album/3W0VJHaitM1oDZ1QT5wFDx",
    },
  ],
  title: "What Happened To The Heart? (Deluxe)",
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
