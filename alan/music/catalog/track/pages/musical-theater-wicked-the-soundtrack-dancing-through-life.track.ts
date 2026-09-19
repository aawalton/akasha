import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const musicalTheaterWickedTheSoundtrackDancingThroughLife = {
  id: "01a0a6c5-1222-74c6-827a-4267f5a68c3b",
  type: "page-type/track",
  slug: "musical-theater-wicked-the-soundtrack-dancing-through-life",
  ownLength: 9.7894,
  ownProgress: 0,
  partOfCollections: ["release/musical-theater-wicked-the-soundtrack"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6qo8v2y2MHUSPLs7VBc6cG",
      externalLink: "https://open.spotify.com/track/6qo8v2y2MHUSPLs7VBc6cG",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dancing Through Life",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "2Je7IdIHe8UvZbLXdapQ26", artistName: "Jonathan Bailey" },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0yF5IqIHlPDti2mfZtHe3K", artistName: "Ethan Slater" },
    { externalId: "6uGIoRQUqP4ncxyg6HksA1", artistName: "Marissa Bode" },
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
  ],
  trackKey:
    "dancingthroughlife|0yF5IqIHlPDti2mfZtHe3K,2Je7IdIHe8UvZbLXdapQ26,46UMQ0cW8ToR8egkBRwAxZ,66CXWjxzNUsdJxJ2JdwvnR,6uGIoRQUqP4ncxyg6HksA1|587364",
  song: "song/jonathan-bailey-dancing-through-life",
} as const satisfies Track
