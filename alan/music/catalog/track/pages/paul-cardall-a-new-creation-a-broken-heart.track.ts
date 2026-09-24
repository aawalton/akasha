import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationABrokenHeart = {
  id: "01a0b4c8-364e-70b9-b8d7-b79bfe38bd47",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-a-broken-heart",
  ownLength: 5.002883333333333,
  ownProgress: 5.002883333333333,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Broken Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "abrokenheart|7FQRbf8gbKw8KZQZAJWxH2|300173",
  song: "song/paul-cardall-a-broken-heart",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 7,
      externalId: "6E9tYJkh2ajjhOrXjlKuvd",
      externalLink: "https://open.spotify.com/track/6E9tYJkh2ajjhOrXjlKuvd",
    },
  ],
} as const satisfies Track
