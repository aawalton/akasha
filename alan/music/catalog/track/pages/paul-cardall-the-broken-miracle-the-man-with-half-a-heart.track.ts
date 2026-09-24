import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleTheManWithHalfAHeart = {
  id: "01a0b4c8-2ef5-71fa-9415-1da414678924",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-the-man-with-half-a-heart",
  ownLength: 4.323083333333333,
  ownProgress: 4.323083333333333,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Man with Half a Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Thompson Square" }],
  trackKey: "themanwithhalfaheart|0Bvs8yPjrQSbmVIRqSg1Sp,7FQRbf8gbKw8KZQZAJWxH2|259385",
  song: "song/paul-cardall-the-man-with-half-a-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 3,
      externalId: "7Jx5SMT5AWkKm6n8ZIdheO",
      externalLink: "https://open.spotify.com/track/7Jx5SMT5AWkKm6n8ZIdheO",
    },
  ],
} as const satisfies Track
