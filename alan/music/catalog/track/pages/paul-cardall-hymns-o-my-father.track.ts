import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsOMyFather = {
  id: "01a0b4c8-632a-7310-b5eb-79d545aafa6c",
  type: "page-type/track",
  slug: "paul-cardall-hymns-o-my-father",
  ownLength: 2.156,
  ownProgress: 2.156,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "O My Father",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "omyfather|7FQRbf8gbKw8KZQZAJWxH2|129360",
  song: "song/paul-cardall-o-my-father",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 7,
      externalId: "3pZ3HrAn1Zwr33JnohXW1i",
      externalLink: "https://open.spotify.com/track/3pZ3HrAn1Zwr33JnohXW1i",
    },
  ],
} as const satisfies Track
