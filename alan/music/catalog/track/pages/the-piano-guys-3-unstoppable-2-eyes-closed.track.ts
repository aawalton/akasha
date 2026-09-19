import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3Unstoppable2EyesClosed = {
  id: "01a0afa1-dbbf-7134-b269-b4ca4e22cb85",
  type: "page-type/track",
  slug: "the-piano-guys-3-unstoppable-2-eyes-closed",
  ownLength: 4.0759,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-unstoppable-2"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pnd8pyDrzVGKY9kEHNVD1",
      externalLink: "https://open.spotify.com/track/7pnd8pyDrzVGKY9kEHNVD1",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Eyes Closed",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "eyesclosed|0jW6R8CVyVohuUJVcuweDI|244554",
  song: "song/the-piano-guys-eyes-closed",
} as const satisfies Track
