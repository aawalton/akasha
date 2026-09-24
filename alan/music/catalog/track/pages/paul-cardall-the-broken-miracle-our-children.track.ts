import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleOurChildren = {
  id: "01a0b4c8-2fcc-77a3-b22e-6ba17714e2f3",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-our-children",
  ownLength: 2.5097666666666667,
  ownProgress: 2.5097666666666667,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Our Children",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "ourchildren|7FQRbf8gbKw8KZQZAJWxH2|150586",
  song: "song/paul-cardall-our-children",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 9,
      externalId: "09s74kCqiu54xoeSEDoXDH",
      externalLink: "https://open.spotify.com/track/09s74kCqiu54xoeSEDoXDH",
    },
  ],
} as const satisfies Track
