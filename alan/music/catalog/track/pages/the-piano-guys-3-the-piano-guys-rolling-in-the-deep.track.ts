import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysRollingInTheDeep = {
  id: "01a0afa2-1a23-791e-8c64-b30f113a9d2d",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-rolling-in-the-deep",
  ownLength: 3.8688666666666665,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6hDR1ByLjs6y7YNwQm5K4a",
      externalLink: "https://open.spotify.com/track/6hDR1ByLjs6y7YNwQm5K4a",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Rolling in the Deep",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "rollinginthedeep|0jW6R8CVyVohuUJVcuweDI|232132",
  song: "song/the-piano-guys-rolling-in-the-deep",
} as const satisfies Track
