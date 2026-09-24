import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAnEveningInParisAnEveningInParis = {
  id: "01a0b4c8-693b-7c92-b89c-97e9642c92ab",
  type: "page-type/track",
  slug: "paul-cardall-an-evening-in-paris-an-evening-in-paris",
  ownLength: 5.135633333333334,
  ownProgress: 5.135633333333334,
  partOfCollections: [
    "release/paul-cardall-an-evening-in-paris",
    "release/paul-cardall-return-home",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "An Evening In Paris",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "aneveninginparis|7FQRbf8gbKw8KZQZAJWxH2|308138",
  song: "song/paul-cardall-an-evening-in-paris",
  carriedBy: [
    {
      release: "release/paul-cardall-an-evening-in-paris",
      discNumber: 1,
      position: 1,
      externalId: "7l5nLeotZ90aJRlje3zKqp",
      externalLink: "https://open.spotify.com/track/7l5nLeotZ90aJRlje3zKqp",
    },
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 4,
      externalId: "6Usay1Fv5Ni9D2c3kBR0Ml",
      externalLink: "https://open.spotify.com/track/6Usay1Fv5Ni9D2c3kBR0Ml",
    },
  ],
} as const satisfies Track
