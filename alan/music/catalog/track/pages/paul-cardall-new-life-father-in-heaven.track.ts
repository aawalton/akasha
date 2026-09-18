import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeFatherInHeaven = {
  id: "01a0b4c8-3ff1-764f-9801-03b73ba2072b",
  type: "page-type/track",
  slug: "paul-cardall-new-life-father-in-heaven",
  ownLength: 1.668,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-new-life"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3HCpWKRsBhQ6xHzcAMNzBc",
      externalLink: "https://open.spotify.com/track/3HCpWKRsBhQ6xHzcAMNzBc",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Father in Heaven",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fatherinheaven|7FQRbf8gbKw8KZQZAJWxH2|100080",
} as const satisfies Track
