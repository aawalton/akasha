import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaCloudsMissClareRemembers = {
  id: "01a0a5b0-2a11-7374-8325-9046847bdb5b",
  type: "track",
  slug: "enya-clouds-miss-clare-remembers",
  ownLength: 1.9933333333333334,
  ownProgress: 0,
  partOfCollections: ["release/enya-clouds"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jIMjialMpOOkKiR0FeWii",
      externalLink: "https://open.spotify.com/track/0jIMjialMpOOkKiR0FeWii",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Miss Clare Remembers",
} as const satisfies Track
