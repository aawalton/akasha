import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsTheRelease = {
  id: "01a0b4c8-6352-7c8f-9327-e4e2feeddc94",
  type: "page-type/track",
  slug: "paul-cardall-hymns-the-release",
  ownLength: 3.3924333333333334,
  ownProgress: 3.3924333333333334,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Release",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "therelease|7FQRbf8gbKw8KZQZAJWxH2|203546",
  song: "song/paul-cardall-the-release",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 8,
      externalId: "49IeMe9gQ6LBxTwiq88Q3s",
      externalLink: "https://open.spotify.com/track/49IeMe9gQ6LBxTwiq88Q3s",
    },
  ],
} as const satisfies Track
