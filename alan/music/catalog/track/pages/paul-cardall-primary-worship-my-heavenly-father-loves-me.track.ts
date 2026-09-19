import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallPrimaryWorshipMyHeavenlyFatherLovesMe = {
  id: "01a0b4c8-5651-77ed-87f4-735e0ea06e19",
  type: "page-type/track",
  slug: "paul-cardall-primary-worship-my-heavenly-father-loves-me",
  ownLength: 5.0357666666666665,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-primary-worship"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3QoatG0uXnkS9TeazMyHlH",
      externalLink: "https://open.spotify.com/track/3QoatG0uXnkS9TeazMyHlH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "My Heavenly Father Loves Me",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "myheavenlyfatherlovesme|7FQRbf8gbKw8KZQZAJWxH2|302146",
  song: "song/paul-cardall-my-heavenly-father-loves-me",
} as const satisfies Track
