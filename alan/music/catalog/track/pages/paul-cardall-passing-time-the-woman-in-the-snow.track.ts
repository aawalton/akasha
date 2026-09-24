import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPassingTimeTheWomanInTheSnow = {
  id: "01a0b4c8-6c61-74c3-b6e1-f292910f8147",
  type: "page-type/track",
  slug: "paul-cardall-passing-time-the-woman-in-the-snow",
  ownLength: 3.71895,
  ownProgress: 3.71895,
  partOfCollections: ["release/paul-cardall-passing-time"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Woman in the Snow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "thewomaninthesnow|7FQRbf8gbKw8KZQZAJWxH2|223137",
  song: "song/paul-cardall-the-woman-in-the-snow",
  carriedBy: [
    {
      release: "release/paul-cardall-passing-time",
      discNumber: 1,
      position: 5,
      externalId: "05pIB1M8VNrVW8rUZroN6B",
      externalLink: "https://open.spotify.com/track/05pIB1M8VNrVW8rUZroN6B",
    },
  ],
} as const satisfies Track
