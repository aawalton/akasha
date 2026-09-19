import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTwilightZoneTwilightZoneInstrumental = {
  id: "01a0a6c5-321c-78ef-93fa-06545bab7fd1",
  type: "page-type/track",
  slug: "ariana-grande-twilight-zone-twilight-zone-instrumental",
  ownLength: 3.3053333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-twilight-zone"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1uaUWonU8uJKnKHaYiZNPD",
      externalLink: "https://open.spotify.com/track/1uaUWonU8uJKnKHaYiZNPD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "twilight zone - instrumental",
  trackType: "instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "twilightzoneinstrumental|66CXWjxzNUsdJxJ2JdwvnR|198320",
  song: "song/ariana-grande-twilight-zone",
} as const satisfies Track
