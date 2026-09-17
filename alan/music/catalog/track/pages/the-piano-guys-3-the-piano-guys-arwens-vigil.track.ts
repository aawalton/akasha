import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuysArwensVigil = {
  id: "01a0afa2-1973-7c3c-8b12-54ded1ff10d8",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-arwens-vigil",
  ownLength: 3.927983333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0nIO6lmFEdRPyQi4uJaHon",
      externalLink: "https://open.spotify.com/track/0nIO6lmFEdRPyQi4uJaHon",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Arwen's Vigil",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "arwensvigil|0jW6R8CVyVohuUJVcuweDI|235679",
} as const satisfies Track
