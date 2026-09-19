import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeRedPoppyFields = {
  id: "01a0b4c8-28ee-7c4b-982a-d5aff554202e",
  type: "page-type/track",
  slug: "paul-cardall-return-home-red-poppy-fields",
  ownLength: 4.00485,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1DNEP4HvXC8SZCm0oKfeUz",
      externalLink: "https://open.spotify.com/track/1DNEP4HvXC8SZCm0oKfeUz",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Red Poppy Fields",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "redpoppyfields|7FQRbf8gbKw8KZQZAJWxH2|240291",
  song: "song/paul-cardall-red-poppy-fields",
} as const satisfies Track
