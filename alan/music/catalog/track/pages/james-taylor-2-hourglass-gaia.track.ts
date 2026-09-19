import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylor2HourglassGaia = {
  id: "01a0abeb-3a46-7dad-a1c1-7a760e7d00a0",
  type: "page-type/track",
  slug: "james-taylor-2-hourglass-gaia",
  ownLength: 5.4811,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-2-hourglass"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HvUn2UZobWGX6BLijuaru",
      externalLink: "https://open.spotify.com/track/4HvUn2UZobWGX6BLijuaru",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Gaia",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "gaia|0vn7UBvSQECKJm2817Yf1P|328866",
  song: "song/james-taylor-gaia",
} as const satisfies Track
