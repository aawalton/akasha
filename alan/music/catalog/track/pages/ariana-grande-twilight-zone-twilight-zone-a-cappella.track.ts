import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeTwilightZoneTwilightZoneACappella = {
  id: "01a0a6c5-31f9-76bf-ba58-31db97d7f495",
  type: "page-type/track",
  slug: "ariana-grande-twilight-zone-twilight-zone-a-cappella",
  ownLength: 3.02755,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-twilight-zone"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6n8BzWM6Jho1R7gogHRe1t",
      externalLink: "https://open.spotify.com/track/6n8BzWM6Jho1R7gogHRe1t",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "twilight zone - a cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "twilightzoneacappella|66CXWjxzNUsdJxJ2JdwvnR|181653",
  song: "song/ariana-grande-twilight-zone",
} as const satisfies Track
