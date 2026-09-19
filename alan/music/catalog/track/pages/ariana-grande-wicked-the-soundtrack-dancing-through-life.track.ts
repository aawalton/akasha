import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackDancingThroughLife = {
  id: "01a0a6c5-4c88-733f-96f4-6f01d4dbc984",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-dancing-through-life",
  ownLength: 9.7894,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2ivc7aWOeWTxCeWKdf8Tds",
      externalLink: "https://open.spotify.com/track/2ivc7aWOeWTxCeWKdf8Tds",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dancing Through Life",
  trackType: "studio",
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
  song: "song/ariana-grande-dancing-through-life",
} as const satisfies Track
