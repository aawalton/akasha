import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallAncestorsSweetwater = {
  id: "01a0b4c8-1fae-7b81-80a7-7020882b13f7",
  type: "page-type/track",
  slug: "paul-cardall-ancestors-sweetwater",
  ownLength: 3.345066666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-ancestors"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0ec8JR39xoNP5a1WGcxZMe",
      externalLink: "https://open.spotify.com/track/0ec8JR39xoNP5a1WGcxZMe",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Sweetwater",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "sweetwater|7FQRbf8gbKw8KZQZAJWxH2|200704",
} as const satisfies Track
