import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeWickedTheSoundtrackWhatIsThisFeeling = {
  id: "01a0a6c5-4c4b-7494-a8d9-7eb97cc7e137",
  type: "page-type/track",
  slug: "ariana-grande-wicked-the-soundtrack-what-is-this-feeling",
  ownLength: 3.8157833333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-wicked-the-soundtrack"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6nC9vcKeasXw3JhNuGKL6v",
      externalLink: "https://open.spotify.com/track/6nC9vcKeasXw3JhNuGKL6v",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "What Is This Feeling?",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "46UMQ0cW8ToR8egkBRwAxZ", artistName: "Cynthia Erivo" },
  ],
  trackKey: "whatisthisfeeling|46UMQ0cW8ToR8egkBRwAxZ,66CXWjxzNUsdJxJ2JdwvnR|228947",
  song: "song/ariana-grande-what-is-this-feeling",
} as const satisfies Track
