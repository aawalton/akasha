import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseEden = {
  id: "01a0b4c8-525a-7e15-a2fe-648ea71ad7ad",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-eden",
  ownLength: 3.4311,
  ownProgress: 3.4311,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eden",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "eden|7FQRbf8gbKw8KZQZAJWxH2|205866",
  song: "song/paul-cardall-eden",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 10,
      externalId: "4gP6Z909MxyzJH7SxxxWfV",
      externalLink: "https://open.spotify.com/track/4gP6Z909MxyzJH7SxxxWfV",
    },
  ],
} as const satisfies Track
