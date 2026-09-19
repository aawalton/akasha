import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveTheCelloSongIntroductionLive = {
  id: "01a0afa2-1475-7e38-8148-1c492ad22978",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-cello-song-introduction-live",
  ownLength: 1.48155,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "23jE7bp7YZCyhVx2OnNrIb",
      externalLink: "https://open.spotify.com/track/23jE7bp7YZCyhVx2OnNrIb",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "The Cello Song (Introduction) - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "thecellosongintroductionlive|0jW6R8CVyVohuUJVcuweDI|88893",
  song: "song/the-piano-guys-the-cello-song-introduction",
} as const satisfies Track
