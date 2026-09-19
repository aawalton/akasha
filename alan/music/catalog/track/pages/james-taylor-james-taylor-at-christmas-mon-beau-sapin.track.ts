import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jamesTaylorJamesTaylorAtChristmasMonBeauSapin = {
  id: "01a0abeb-2dde-75a9-9308-4222ce543a79",
  type: "page-type/track",
  slug: "james-taylor-james-taylor-at-christmas-mon-beau-sapin",
  ownLength: 3.1302166666666666,
  ownProgress: 0,
  partOfCollections: ["release/james-taylor-james-taylor-at-christmas"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0SEtLXirpHg7m50arIBfPi",
      externalLink: "https://open.spotify.com/track/0SEtLXirpHg7m50arIBfPi",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Mon Beau Sapin",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0vn7UBvSQECKJm2817Yf1P", artistName: "James Taylor" }],
  trackKey: "monbeausapin|0vn7UBvSQECKJm2817Yf1P|187813",
  song: "song/james-taylor-mon-beau-sapin",
} as const satisfies Track
