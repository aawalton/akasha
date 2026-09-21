import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedForGoodTheSoundtrackNoGoodDeed = {
  id: "01a0a6c5-0e62-7a12-88a7-44fb66abd137",
  type: "page-type/track",
  slug: "ariana-grande-wicked-for-good-the-soundtrack-no-good-deed",
  ownLength: 3.8375,
  ownProgress: 3.8375,
  partOfCollections: ["release/ariana-grande-wicked-for-good-the-soundtrack"],
  position: 8,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5o0hD6Bs6RdyZxfYBoEEc8",
      externalLink: "https://open.spotify.com/track/5o0hD6Bs6RdyZxfYBoEEc8",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "No Good Deed",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" }],
  trackKey: "nogooddeed|46UMQ0cW8ToR8egkBRwAxZ|230250",
  song: "song/ariana-grande-no-good-deed",
  carriedBy: [
    {
      release: "release/ariana-grande-wicked-for-good-the-soundtrack",
      discNumber: 1,
      position: 8,
      externalId: "5o0hD6Bs6RdyZxfYBoEEc8",
      externalLink: "https://open.spotify.com/track/5o0hD6Bs6RdyZxfYBoEEc8",
    },
  ],
} as const satisfies Track
