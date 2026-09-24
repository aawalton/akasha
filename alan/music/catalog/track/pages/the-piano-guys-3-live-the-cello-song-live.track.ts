import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveTheCelloSongLive = {
  id: "01a0afa2-149e-79f1-a47e-fafa52745142",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-the-cello-song-live",
  ownLength: 3.3908833333333335,
  ownProgress: 3.3908833333333335,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Cello Song (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "thecellosonglive|0jW6R8CVyVohuUJVcuweDI|203453",
  song: "song/the-piano-guys-the-cello-song",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 13,
      externalId: "4cw5UEJFMcjqQjiorPEiJe",
      externalLink: "https://open.spotify.com/track/4cw5UEJFMcjqQjiorPEiJe",
    },
  ],
} as const satisfies Track
