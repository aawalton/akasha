import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyYoullNeverKnow = {
  id: "01a0a6c5-3078-70c7-b232-6bae6498b239",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-youll-never-know",
  ownLength: 3.5713333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4PqIj0WOfPAq4QAvisjgpd",
      externalLink: "https://open.spotify.com/track/4PqIj0WOfPAq4QAvisjgpd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You’ll Never Know",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "youllneverknow|66CXWjxzNUsdJxJ2JdwvnR|214280",
  song: "song/ariana-grande-you-ll-never-know",
} as const satisfies Track
