import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const lindseyStirling2ShatterMeDeluxe = {
  id: "01a0676a-d728-706f-a448-cba1a51c490a",
  type: "release",
  slug: "lindsey-stirling-2-shatter-me-deluxe",
  ownLength: 64.22173333333333,
  ownProgress: 64.221733,
  partOfCollections: ["artist/lindsey-stirling"],
  position: 0,
  publishedAt: "2025-09-26",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ONNVBhYiojv9aJeK84Ghn",
      externalLink: "https://open.spotify.com/album/2ONNVBhYiojv9aJeK84Ghn",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Shatter Me (Deluxe)",
} as const satisfies Release
