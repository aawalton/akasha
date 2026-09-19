import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeIDonTKnowWhyIJustDoIDontKnowWhyIJustDo = {
  id: "01a0a6c5-323d-72d1-8218-157c0d029e15",
  type: "page-type/track",
  slug: "ariana-grande-i-don-t-know-why-i-just-do-i-dont-know-why-i-just-do",
  ownLength: 3.7471,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-i-don-t-know-why-i-just-do"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0MF0kprFLhr2KtqNjgN7bw",
      externalLink: "https://open.spotify.com/track/0MF0kprFLhr2KtqNjgN7bw",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Don't Know Why (I Just Do)",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    {
      externalId: "7lbrnX0ng1Il12RdEU1Ohu",
      artistName: "Jeff Goldblum & The Mildred Snitzer Orchestra",
    },
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
  ],
  trackKey: "idontknowwhyijustdo|66CXWjxzNUsdJxJ2JdwvnR,7lbrnX0ng1Il12RdEU1Ohu|224826",
  song: "song/ariana-grande-i-dont-know-why-i-just-do",
} as const satisfies Track
