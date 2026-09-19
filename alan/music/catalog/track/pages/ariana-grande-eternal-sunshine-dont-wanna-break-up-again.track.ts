import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineDontWannaBreakUpAgain = {
  id: "01a0a6c5-1b00-758e-aaeb-f0ac9190b58a",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-dont-wanna-break-up-again",
  ownLength: 2.9001,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0o3ua5ufFK7nfRzbDUNoGA",
      externalLink: "https://open.spotify.com/track/0o3ua5ufFK7nfRzbDUNoGA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "don't wanna break up again",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "dontwannabreakupagain|66CXWjxzNUsdJxJ2JdwvnR|174006",
  song: "song/ariana-grande-don-t-wanna-break-up-again",
} as const satisfies Track
