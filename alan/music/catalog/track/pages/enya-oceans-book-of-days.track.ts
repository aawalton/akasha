import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansBookOfDays = {
  id: "01a0a5b0-2be9-7f1a-ab5e-31beda4e5bb6",
  type: "page-type/track",
  slug: "enya-oceans-book-of-days",
  ownLength: 2.94155,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5kbVL0w41I9DRM0zIJ0H0D",
      externalLink: "https://open.spotify.com/track/5kbVL0w41I9DRM0zIJ0H0D",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Book of Days",
} as const satisfies Track
