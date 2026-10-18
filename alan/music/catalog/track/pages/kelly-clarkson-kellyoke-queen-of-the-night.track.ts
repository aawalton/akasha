import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonKellyokeQueenOfTheNight = {
  id: "01a14f45-0238-7673-8d3c-ede92ee595b4",
  type: "page-type/track",
  slug: "kelly-clarkson-kellyoke-queen-of-the-night",
  ownLength: 3.1752,
  ownProgress: 3.1752,
  partOfCollections: ["release/kelly-clarkson-kellyoke"],
  status: "completed",
  unit: "unit/minutes",
  title: "Queen of the Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/kelly-clarkson" }],
  trackKey: "queenofthenight|3BmGtnKgCSGYIUhmivXKWX|190512",
  song: "song/kelly-clarkson-queen-of-the-night",
  carriedBy: [
    {
      release: "release/kelly-clarkson-kellyoke",
      discNumber: 1,
      position: 4,
      externalId: "5Q65ttW5DQ1MlJjuJ0yGVS",
      externalLink: "https://open.spotify.com/track/5Q65ttW5DQ1MlJjuJ0yGVS",
    },
  ],
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T14:00:27.546Z",
} as const satisfies Track
