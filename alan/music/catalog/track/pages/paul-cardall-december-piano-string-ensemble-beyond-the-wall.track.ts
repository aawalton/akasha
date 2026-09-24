import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallDecemberPianoStringEnsembleBeyondTheWall = {
  id: "01a0b4c8-2ce4-742a-aa24-6a5c6806ead6",
  type: "page-type/track",
  slug: "paul-cardall-december-piano-string-ensemble-beyond-the-wall",
  ownLength: 3.4731,
  ownProgress: 3.4731,
  partOfCollections: ["release/paul-cardall-december-piano-string-ensemble"],
  status: "completed",
  unit: "unit/minutes",
  title: "Beyond The Wall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "beyondthewall|7FQRbf8gbKw8KZQZAJWxH2|208386",
  song: "song/paul-cardall-beyond-the-wall",
  carriedBy: [
    {
      release: "release/paul-cardall-december-piano-string-ensemble",
      discNumber: 1,
      position: 2,
      externalId: "0FqDi7tY8acbrRtU4Jb6TD",
      externalLink: "https://open.spotify.com/track/0FqDi7tY8acbrRtU4Jb6TD",
    },
  ],
} as const satisfies Track
