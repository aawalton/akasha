import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveTheCelloSongLive = {
  id: "01a0afa2-149e-79f1-a47e-fafa52745142",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-cello-song-live",
  ownLength: 3.3908833333333335,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4cw5UEJFMcjqQjiorPEiJe",
      externalLink: "https://open.spotify.com/track/4cw5UEJFMcjqQjiorPEiJe",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song (Live)",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosonglive|0jW6R8CVyVohuUJVcuweDI|203453",
} as const satisfies Track
