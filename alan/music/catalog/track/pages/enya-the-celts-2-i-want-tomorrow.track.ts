import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2IWantTomorrow = {
  id: "01a0a5b0-2050-7ea4-8562-538a0737f32a",
  type: "track",
  slug: "enya-the-celts-2-i-want-tomorrow",
  ownLength: 4.0371,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6yNPs9VenWSor0wKBChVo3",
      externalLink: "https://open.spotify.com/track/6yNPs9VenWSor0wKBChVo3",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Want Tomorrow",
} as const satisfies Track
