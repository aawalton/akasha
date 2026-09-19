import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallHymnsHowGreatTheWisdomAndTheLove = {
  id: "01a0b4c8-62b0-75d3-ab53-9d1aad50288f",
  type: "page-type/track",
  slug: "paul-cardall-hymns-how-great-the-wisdom-and-the-love",
  ownLength: 2.408,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-hymns"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6mcA40CLKVcxfoeofw6suv",
      externalLink: "https://open.spotify.com/track/6mcA40CLKVcxfoeofw6suv",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "How Great The Wisdom And The Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "howgreatthewisdomandthelove|7FQRbf8gbKw8KZQZAJWxH2|144480",
  song: "song/paul-cardall-how-great-the-wisdom-and-the-love",
} as const satisfies Track
