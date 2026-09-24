import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMoonMusicAeterna = {
  id: "01a0b9ee-c9bf-736a-978f-72111239e916",
  type: "page-type/track",
  slug: "coldplay-moon-music-aeterna",
  ownLength: 4.217133333333333,
  ownProgress: 4.217133333333333,
  partOfCollections: [
    "release/coldplay-moon-music",
    "release/coldplay-moon-music-full-moon-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "AETERNA",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "aeterna|4gzpq5DPGxSnKTe4SA8HAU|253028",
  song: "song/coldplay-aeterna",
  carriedBy: [
    {
      release: "release/coldplay-moon-music",
      discNumber: 1,
      position: 8,
      externalId: "4EGl6H86WFalKVWSXbheb2",
      externalLink: "https://open.spotify.com/track/4EGl6H86WFalKVWSXbheb2",
    },
    {
      release: "release/coldplay-moon-music-full-moon-edition",
      discNumber: 1,
      position: 8,
      externalId: "3Q3dNGUbRNp0Cn9ayZQJl0",
      externalLink: "https://open.spotify.com/track/3Q3dNGUbRNp0Cn9ayZQJl0",
    },
  ],
} as const satisfies Track
