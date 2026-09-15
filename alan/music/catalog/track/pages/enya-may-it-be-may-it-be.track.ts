import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaMayItBeMayItBe = {
  id: "01a0a5b0-22dc-77de-bb62-2b3228b5c5d2",
  type: "track",
  slug: "enya-may-it-be-may-it-be",
  ownLength: 3.5177666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-may-it-be"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1wIQ2Nm0raqOapHK4bCD3J",
      externalLink: "https://open.spotify.com/track/1wIQ2Nm0raqOapHK4bCD3J",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "May It Be",
} as const satisfies Track
