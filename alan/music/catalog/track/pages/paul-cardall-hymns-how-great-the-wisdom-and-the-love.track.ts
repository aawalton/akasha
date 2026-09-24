import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsHowGreatTheWisdomAndTheLove = {
  id: "01a0b4c8-62b0-75d3-ab53-9d1aad50288f",
  type: "page-type/track",
  slug: "paul-cardall-hymns-how-great-the-wisdom-and-the-love",
  ownLength: 2.408,
  ownProgress: 2.408,
  partOfCollections: ["release/paul-cardall-hymns"],
  status: "completed",
  unit: "unit/minutes",
  title: "How Great The Wisdom And The Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "howgreatthewisdomandthelove|7FQRbf8gbKw8KZQZAJWxH2|144480",
  song: "song/paul-cardall-how-great-the-wisdom-and-the-love",
  carriedBy: [
    {
      release: "release/paul-cardall-hymns",
      discNumber: 1,
      position: 4,
      externalId: "6mcA40CLKVcxfoeofw6suv",
      externalLink: "https://open.spotify.com/track/6mcA40CLKVcxfoeofw6suv",
    },
  ],
} as const satisfies Track
