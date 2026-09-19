import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionWePray = {
  id: "01a0b9ee-ca7c-7481-a02a-8994e7c3b1c3",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-we-pray",
  ownLength: 3.8901,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-moon-music-full-moon-edition"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6xX6zmaXeKzB4u9TiM1XgU",
      externalLink: "https://open.spotify.com/track/6xX6zmaXeKzB4u9TiM1XgU",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WE PRAY",
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
    "wepray|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
} as const satisfies Track
