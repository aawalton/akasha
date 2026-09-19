import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoEyesClosed = {
  id: "01a0afa1-c043-742b-ae8c-04dca0a7a4ae",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-eyes-closed",
  ownLength: 4.0759,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2VVmlrQyuxfVfVVhhZHvkU",
      externalLink: "https://open.spotify.com/track/2VVmlrQyuxfVfVVhhZHvkU",
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
