import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterSingularActIiICantStopMe = {
  id: "01a0b111-2526-76c3-8600-0bdabb261668",
  type: "page-type/track",
  slug: "sabrina-carpenter-singular-act-ii-i-cant-stop-me",
  ownLength: 3.7016833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-singular-act-ii"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1AVVv4FgNLxQlV64j7dfP1",
      externalLink: "https://open.spotify.com/track/1AVVv4FgNLxQlV64j7dfP1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "I Can't Stop Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "6cK3NBO6uP7hh0oyuVELFl", artistName: "Saweetie" },
  ],
  trackKey: "icantstopme|6cK3NBO6uP7hh0oyuVELFl,74KM79TiuVKeVCqs8QtB0B|222101",
  song: "song/sabrina-carpenter-i-cant-stop-me",
} as const satisfies Track
