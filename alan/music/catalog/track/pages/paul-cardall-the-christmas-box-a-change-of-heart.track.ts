import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheChristmasBoxAChangeOfHeart = {
  id: "01a0b4c8-6612-7a7f-9945-a3f5aa894d0d",
  type: "page-type/track",
  slug: "paul-cardall-the-christmas-box-a-change-of-heart",
  ownLength: 3.87,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-the-christmas-box"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1izkfUm8NdwJ4nx4w61Z6d",
      externalLink: "https://open.spotify.com/track/1izkfUm8NdwJ4nx4w61Z6d",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "A Change Of Heart",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "achangeofheart|7FQRbf8gbKw8KZQZAJWxH2|232200",
  song: "song/paul-cardall-a-change-of-heart",
} as const satisfies Track
