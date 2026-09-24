import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChasingCrownsTheGreatAlexander = {
  id: "01a0b4c8-214c-7f28-b78c-b70f0f9a17bb",
  type: "page-type/track",
  slug: "paul-cardall-chasing-crowns-the-great-alexander",
  ownLength: 3.3041666666666667,
  ownProgress: 3.3041666666666667,
  partOfCollections: ["release/paul-cardall-chasing-crowns"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Great Alexander",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "thegreatalexander|7FQRbf8gbKw8KZQZAJWxH2|198250",
  song: "song/paul-cardall-the-great-alexander",
  carriedBy: [
    {
      release: "release/paul-cardall-chasing-crowns",
      discNumber: 1,
      position: 6,
      externalId: "5FaANEG8jIuo7aoGumJWFP",
      externalLink: "https://open.spotify.com/track/5FaANEG8jIuo7aoGumJWFP",
    },
  ],
} as const satisfies Track
