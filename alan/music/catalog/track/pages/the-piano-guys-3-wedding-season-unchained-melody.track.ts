import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonUnchainedMelody = {
  id: "01a0afa1-d8a3-73d9-b854-f997c72f04cd",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-unchained-melody",
  ownLength: 3.0182,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 20,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0i2W2g0SvZcbPZgKRUbwRm",
      externalLink: "https://open.spotify.com/track/0i2W2g0SvZcbPZgKRUbwRm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Unchained Melody",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "unchainedmelody|0jW6R8CVyVohuUJVcuweDI|181092",
  song: "song/the-piano-guys-unchained-melody",
} as const satisfies Track
