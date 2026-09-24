import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWePrayElyannaVersionWePraySingleVersion = {
  id: "01a0b9ee-eb4f-72ab-90b8-a0209356af18",
  type: "page-type/track",
  slug: "coldplay-we-pray-elyanna-version-we-pray-single-version",
  ownLength: 3.8901,
  ownProgress: 3.8901,
  partOfCollections: [
    "release/coldplay-we-pray-elyanna-version",
    "release/coldplay-we-pray-tini-version",
    "release/coldplay-we-pray",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "WE PRAY - Single Version",
  trackType: "version",
  explicit: false,
  trackArtist: [
    { artist: "artist/coldplay" },
    { artistName: "Little Simz" },
    { artistName: "Burna Boy" },
    { artistName: "Elyanna" },
    { artistName: "TINI" },
  ],
  trackKey:
    "wepraysingleversion|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
  carriedBy: [
    {
      release: "release/coldplay-we-pray",
      discNumber: 1,
      position: 1,
      externalId: "2sKHevALE8DKDkwEo04Pbh",
      externalLink: "https://open.spotify.com/track/2sKHevALE8DKDkwEo04Pbh",
    },
    {
      release: "release/coldplay-we-pray-elyanna-version",
      discNumber: 1,
      position: 3,
      externalId: "62vegKSQtJU9DnfF5txpDN",
      externalLink: "https://open.spotify.com/track/62vegKSQtJU9DnfF5txpDN",
    },
    {
      release: "release/coldplay-we-pray-tini-version",
      discNumber: 1,
      position: 2,
      externalId: "4ePie7AbHKyKdQtCte6SYC",
      externalLink: "https://open.spotify.com/track/4ePie7AbHKyKdQtCte6SYC",
    },
  ],
} as const satisfies Track
