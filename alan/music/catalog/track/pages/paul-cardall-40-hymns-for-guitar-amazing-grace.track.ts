import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardall40HymnsForGuitarAmazingGrace = {
  id: "01a0b4c8-19e4-732a-b45b-88653422d0d3",
  type: "page-type/track",
  slug: "paul-cardall-40-hymns-for-guitar-amazing-grace",
  ownLength: 3.475,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-40-hymns-for-guitar"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5mZacuPQMg3lwMq2OSDsCf",
      externalLink: "https://open.spotify.com/track/5mZacuPQMg3lwMq2OSDsCf",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Amazing Grace",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "amazinggrace|7FQRbf8gbKw8KZQZAJWxH2|208500",
  song: "song/paul-cardall-amazing-grace",
} as const satisfies Track
