import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayWePrayElyannaVersionWePrayTiniVersion = {
  id: "01a0b9ee-eb28-70ef-8753-f5e7a94d33b5",
  type: "page-type/track",
  slug: "coldplay-we-pray-elyanna-version-we-pray-tini-version",
  ownLength: 3.8901,
  ownProgress: 3.8901,
  partOfCollections: [
    "release/coldplay-we-pray-elyanna-version",
    "release/coldplay-we-pray-tini-version",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "WE PRAY - (TINI Version)",
  trackType: "version",
  explicit: false,
  trackArtist: [
    { artist: "artist/coldplay" },
    { artistName: "Burna Boy" },
    { artistName: "Elyanna" },
    { artistName: "TINI" },
    { artistName: "Little Simz" },
  ],
  trackKey:
    "wepraytiniversion|0jIWKlfmD4Ew7HeVVrq03g,3wcj11K77LjEY1PkEazffa,4gzpq5DPGxSnKTe4SA8HAU,6eXZu6O7nAUA5z6vLV8NKI,7vXDAI8JwjW531ouMGbfcp|233406",
  song: "song/coldplay-we-pray",
  carriedBy: [
    {
      release: "release/coldplay-we-pray-elyanna-version",
      discNumber: 1,
      position: 2,
      externalId: "0VP63pJ3ATtUeUUZrYD9SO",
      externalLink: "https://open.spotify.com/track/0VP63pJ3ATtUeUUZrYD9SO",
    },
    {
      release: "release/coldplay-we-pray-tini-version",
      discNumber: 1,
      position: 1,
      externalId: "6OICQoNsUIcYsirqoDo08Y",
      externalLink: "https://open.spotify.com/track/6OICQoNsUIcYsirqoDo08Y",
    },
  ],
} as const satisfies Track
