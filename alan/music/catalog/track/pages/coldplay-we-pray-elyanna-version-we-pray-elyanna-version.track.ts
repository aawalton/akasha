import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWePrayElyannaVersionWePrayElyannaVersion = {
  id: "01a0b9ee-eb00-7d11-a831-8f758a90ee41",
  type: "page-type/track",
  slug: "coldplay-we-pray-elyanna-version-we-pray-elyanna-version",
  ownLength: 3.8901,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-we-pray-elyanna-version"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4rYYAWSdgENNINui9wK3O1",
      externalLink: "https://open.spotify.com/track/4rYYAWSdgENNINui9wK3O1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WE PRAY - (Elyanna Version)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" },
    { externalId: "3wcj11K77LjEY1PkEazffa", artistName: "Burna Boy" },
    { externalId: "0jIWKlfmD4Ew7HeVVrq03g", artistName: "Elyanna" },
    { externalId: "7vXDAI8JwjW531ouMGbfcp", artistName: "TINI" },
    { externalId: "6eXZu6O7nAUA5z6vLV8NKI", artistName: "Little Simz" },
  ],
  trackKey:
    "weprayelyannaversion|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
} as const satisfies Track
