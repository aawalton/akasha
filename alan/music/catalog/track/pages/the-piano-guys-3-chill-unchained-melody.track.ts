import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChillUnchainedMelody = {
  id: "01a0afa1-e1c5-702f-bc58-e40fc1527ab7",
  type: "page-type/track",
  slug: "the-piano-guys-3-chill-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-chill"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6uBlwyMAfcnjD4x9nD4sGc",
      externalLink: "https://open.spotify.com/track/6uBlwyMAfcnjD4x9nD4sGc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
} as const satisfies Track
