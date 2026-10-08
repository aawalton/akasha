import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const byuVocalPoint = {
  id: "01a06803-676b-7004-bb76-903473ed7ee8",
  type: "page-type/artist",
  slug: "byu-vocal-point",
  title: "BYU Vocal Point",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zhxxb24WP6q6rbLHAn2UQ",
      externalLink: "https://open.spotify.com/artist/5zhxxb24WP6q6rbLHAn2UQ",
      lastSyncedAt: "2026-03-02",
    },
  ],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-15T15:49:56.000Z",
} as const satisfies Artist
