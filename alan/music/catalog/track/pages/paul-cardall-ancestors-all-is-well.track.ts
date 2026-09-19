import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsAllIsWell = {
  id: "01a0b4c8-1ff4-7e63-a676-c27fd6e47abd",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-all-is-well",
  ownLength: 2.822,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2AyCNfJNdFWBikXDqzNqGX",
      externalLink: "https://open.spotify.com/track/2AyCNfJNdFWBikXDqzNqGX",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "All Is Well",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "alliswell|7FQRbf8gbKw8KZQZAJWxH2|169320",
  song: "song/paul-cardall-all-is-well",
} as const satisfies Track
