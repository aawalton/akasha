import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYoursTrulyLovinIt = {
  id: "01a0a6c5-2fe5-726a-ba31-fa70736f5010",
  type: "page-type/track",
  slug: "ariana-grande-yours-truly-lovin-it",
  ownLength: 3.01155,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yours-truly"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7EpKfPAURnG9OCVer0S30N",
      externalLink: "https://open.spotify.com/track/7EpKfPAURnG9OCVer0S30N",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Lovin' It",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lovinit|66CXWjxzNUsdJxJ2JdwvnR|180693",
  song: "song/ariana-grande-lovin-it",
} as const satisfies Track
