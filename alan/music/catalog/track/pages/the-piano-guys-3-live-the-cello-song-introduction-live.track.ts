import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveTheCelloSongIntroductionLive = {
  id: "01a0afa2-1475-7e38-8148-1c492ad22978",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-cello-song-introduction-live",
  ownLength: 1.48155,
  ownProgress: 1.48155,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Cello Song (Introduction) - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thecellosongintroductionlive|0jW6R8CVyVohuUJVcuweDI|88893",
  song: "song/the-piano-guys-the-cello-song-introduction",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 12,
      externalId: "23jE7bp7YZCyhVx2OnNrIb",
      externalLink: "https://open.spotify.com/track/23jE7bp7YZCyhVx2OnNrIb",
    },
  ],
} as const satisfies Track
