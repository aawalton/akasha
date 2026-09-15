import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2OnTheRoadAgain = {
  id: "01a0676a-d726-7028-9351-47e31275e3c4",
  type: "release",
  slug: "lindsey-stirling-2-on-the-road-again",
  ownLength: 2.693233333333333,
  ownProgress: 2.693233,
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  publishedAt: "2025-03-14",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6YOoCm27tVol0j3CHX5h0V",
      externalLink: "https://open.spotify.com/album/6YOoCm27tVol0j3CHX5h0V",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "On The Road Again",
} as const satisfies Release
