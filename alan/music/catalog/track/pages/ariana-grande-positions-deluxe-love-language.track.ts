import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxeLoveLanguage = {
  id: "01a0a6c5-2005-7315-9be8-536804a1ca48",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-love-language",
  ownLength: 2.9976666666666665,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4iIrJ94pkIEnGZWv1MhIRC",
      externalLink: "https://open.spotify.com/track/4iIrJ94pkIEnGZWv1MhIRC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "love language",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "lovelanguage|66CXWjxzNUsdJxJ2JdwvnR|179860",
  song: "song/ariana-grande-love-language",
} as const satisfies Track
