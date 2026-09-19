import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWePrayElyannaVersionWePraySingleVersion = {
  id: "01a0b9ee-eb4f-72ab-90b8-a0209356af18",
  type: "page-type/track",
  slug: "coldplay-we-pray-elyanna-version-we-pray-single-version",
  ownLength: 3.8901,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-we-pray-elyanna-version"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62vegKSQtJU9DnfF5txpDN",
      externalLink: "https://open.spotify.com/track/62vegKSQtJU9DnfF5txpDN",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WE PRAY - Single Version",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "6eXZu6O7nAUA5z6vLV8NKI", artistName: "Little Simz" },
    { externalId: "3wcj11K77LjEY1PkEazffa", artistName: "Burna Boy" },
    { externalId: "0jIWKlfmD4Ew7HeVVrq03g", artistName: "Elyanna" },
    { externalId: "7vXDAI8JwjW531ouMGbfcp", artistName: "TINI" },
  ],
  trackKey:
    "wepraysingleversion|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
} as const satisfies Track
