import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallSeptemberWindsSeptemberWinds = {
  id: "01a0b4c8-69dd-76c2-beff-077e90f70d3c",
  type: "page-type/track",
  slug: "paul-cardall-september-winds-september-winds",
  ownLength: 3.8041666666666667,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-september-winds"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1azQ2kty7l8fY41ON2PseU",
      externalLink: "https://open.spotify.com/track/1azQ2kty7l8fY41ON2PseU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "September Winds",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "septemberwinds|7FQRbf8gbKw8KZQZAJWxH2|228250",
  song: "song/paul-cardall-september-winds",
} as const satisfies Track
