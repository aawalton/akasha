import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const thePianoGuys3GoldenHour = {
  id: "01a0676a-d71f-7019-b9ac-0a8e59d3747e",
  type: "page-type/release",
  slug: "the-piano-guys-3-golden-hour",
  ownLength: 2.64285,
  ownProgress: 2.64285,
  partOfCollections: ["artist/the-piano-guys"],
  position: 0,
  publishedAt: "2022-10-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "63Yi6nfJtspC2QlU5od7H7",
      externalLink: "https://open.spotify.com/album/63Yi6nfJtspC2QlU5od7H7",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Golden Hour",
} as const satisfies Release
