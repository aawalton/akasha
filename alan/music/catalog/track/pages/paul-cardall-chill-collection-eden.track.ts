import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallChillCollectionEden = {
  id: "01a0b4c8-4591-721b-837d-5075ff862712",
  type: "page-type/track",
  slug: "paul-cardall-chill-collection-eden",
  ownLength: 3.4368333333333334,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-chill-collection"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5ca2Qm05YfC5C8dtH70qNI",
      externalLink: "https://open.spotify.com/track/5ca2Qm05YfC5C8dtH70qNI",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Eden",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "eden|7FQRbf8gbKw8KZQZAJWxH2|206210",
  song: "song/paul-cardall-eden",
} as const satisfies Track
