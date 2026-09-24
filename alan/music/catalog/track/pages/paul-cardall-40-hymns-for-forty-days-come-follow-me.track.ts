import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForFortyDaysComeFollowMe = {
  id: "01a0b4c8-386f-763d-97b1-24779d3fae8c",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-forty-days-come-follow-me",
  ownLength: 3.2124333333333333,
  ownProgress: 3.2124333333333333,
  partOfCollections: ["release/paul-cardall-40-hymns-for-forty-days"],
  status: "completed",
  unit: "unit/minutes",
  title: "Come, Follow Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "comefollowme|7FQRbf8gbKw8KZQZAJWxH2|192746",
  song: "song/paul-cardall-come-follow-me",
  carriedBy: [
    {
      release: "release/paul-cardall-40-hymns-for-forty-days",
      discNumber: 1,
      position: 10,
      externalId: "2sx0Rjaiw07Yb39zjuua6n",
      externalLink: "https://open.spotify.com/track/2sx0Rjaiw07Yb39zjuua6n",
    },
  ],
} as const satisfies Track
