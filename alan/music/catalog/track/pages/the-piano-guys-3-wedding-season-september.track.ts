import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WeddingSeasonSeptember = {
  id: "01a0afa1-d868-7a57-ae03-27bc5a0ad9f3",
  type: "page-type/track",
  slug: "the-piano-guys-3-wedding-season-september",
  ownLength: 3.4138333333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-wedding-season"],
  position: 18,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "77jeTyFrHTJGGH2BPQnr27",
      externalLink: "https://open.spotify.com/track/77jeTyFrHTJGGH2BPQnr27",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "September",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "september|0jW6R8CVyVohuUJVcuweDI|204830",
  song: "song/the-piano-guys-september",
} as const satisfies Track
