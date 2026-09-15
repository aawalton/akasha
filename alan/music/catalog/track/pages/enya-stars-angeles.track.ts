import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaStarsAngeles = {
  id: "01a0a5b0-16fc-73aa-9950-3dbf3f934475",
  type: "page-type/track",
  slug: "enya-stars-angeles",
  ownLength: 3.9644333333333335,
  ownProgress: 0,
  partOfCollections: ["release/enya-stars"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ztoKGohow9VHP8fTTM3SX",
      externalLink: "https://open.spotify.com/track/4ztoKGohow9VHP8fTTM3SX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Angeles",
} as const satisfies Track
