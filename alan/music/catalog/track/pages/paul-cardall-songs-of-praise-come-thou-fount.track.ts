import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSongsOfPraiseComeThouFount = {
  id: "01a0b4c8-50fb-7536-8199-edc48105ebfb",
  type: "page-type/track",
  slug: "paul-cardall-songs-of-praise-come-thou-fount",
  ownLength: 2.346216666666667,
  ownProgress: 2.346216666666667,
  partOfCollections: ["release/paul-cardall-songs-of-praise"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come Thou Fount",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comethoufount|7FQRbf8gbKw8KZQZAJWxH2|140773",
  song: "song/paul-cardall-come-thou-fount",
  carriedBy: [
    {
      release: "release/paul-cardall-songs-of-praise",
      discNumber: 1,
      position: 1,
      externalId: "1LJg1ICfSlgpUcMXCe4KSz",
      externalLink: "https://open.spotify.com/track/1LJg1ICfSlgpUcMXCe4KSz",
    },
  ],
} as const satisfies Track
