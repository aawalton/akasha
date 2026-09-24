import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationWhereTheresLove = {
  id: "01a0b4c8-370a-7e79-8a70-5564e6f8925a",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-where-theres-love",
  ownLength: 3.7371,
  ownProgress: 3.7371,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Where There's Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "wherethereslove|7FQRbf8gbKw8KZQZAJWxH2|224226",
  song: "song/paul-cardall-where-theres-love",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 12,
      externalId: "2bBUannItBxVnfl5KecDhn",
      externalLink: "https://open.spotify.com/track/2bBUannItBxVnfl5KecDhn",
    },
  ],
} as const satisfies Track
