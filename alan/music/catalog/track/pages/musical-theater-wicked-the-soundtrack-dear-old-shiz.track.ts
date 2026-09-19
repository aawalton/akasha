import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackDearOldShiz = {
  id: "01a0a6c5-1190-7b84-8a99-8d5223389726",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-dear-old-shiz",
  ownLength: 1.1955666666666667,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4HAhrqmjZ6ltgVdPF8K6wn",
      externalLink: "https://open.spotify.com/track/4HAhrqmjZ6ltgVdPF8K6wn",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dear Old Shiz",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3eLZo1bSslvsu0zNhtmMM4", artistName: "Wicked Movie Cast" },
    { externalId: "32zfWhZAXwCpm5edh16fqj", artistName: "Shiz University Choir" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey:
    "dearoldshiz|32zfWhZAXwCpm5edh16fqj,3eLZo1bSslvsu0zNhtmMM4,66CXWjxzNUsdJxJ2JdwvnR|71734",
  song: "song/wicked-movie-cast-dear-old-shiz",
} as const satisfies Track
