import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEarlyMonday = {
  id: "01a0b4c8-4529-779f-94f1-4d5e4ab90728",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-early-monday",
  ownLength: 3.7424666666666666,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0n0WKCk37T1mRILuaYIpWe",
      externalLink: "https://open.spotify.com/track/0n0WKCk37T1mRILuaYIpWe",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Early Monday",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "earlymonday|7FQRbf8gbKw8KZQZAJWxH2|224548",
} as const satisfies Track
