import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseAgnusDei = {
  id: "01a0b4c8-5121-71fb-a09f-dbecefe0ec58",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-agnus-dei",
  ownLength: 5.927333333333333,
  ownProgress: 5.927333333333333,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Agnus Dei",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "agnusdei|7FQRbf8gbKw8KZQZAJWxH2|355640",
  song: "song/paul-cardall-agnus-dei",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 2,
      externalId: "5sIGXXf3iROTkuVwVTd2Jd",
      externalLink: "https://open.spotify.com/track/5sIGXXf3iROTkuVwVTd2Jd",
    },
  ],
} as const satisfies Track
