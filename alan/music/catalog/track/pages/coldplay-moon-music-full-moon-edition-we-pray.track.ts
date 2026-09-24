import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicFullMoonEditionWePray = {
  id: "01a0b9ee-ca7c-7481-a02a-8994e7c3b1c3",
  type: "page-type/track",
  slug: "coldplay-moon-music-full-moon-edition-we-pray",
  ownLength: 3.8901,
  ownProgress: 3.8901,
  partOfCollections: [
    "release/coldplay-moon-music-full-moon-edition",
    "release/coldplay-moon-music",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "WE PRAY",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artist: "artist/coldplay" },
    { artistName: "Little Simz" },
    { artistName: "Burna Boy" },
    { artistName: "Elyanna" },
    { artistName: "TINI" },
  ],
  trackKey:
    "wepray|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 3,
      externalId: "7xrEnNo99wrmIs8ZK3RZMK",
      externalLink: "https://open.spotify.com/track/7xrEnNo99wrmIs8ZK3RZMK",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 3,
      externalId: "6xX6zmaXeKzB4u9TiM1XgU",
      externalLink: "https://open.spotify.com/track/6xX6zmaXeKzB4u9TiM1XgU",
    },
  ],
} as const satisfies Track
