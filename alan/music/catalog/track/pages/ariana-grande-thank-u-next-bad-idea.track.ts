import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextBadIdea = {
  id: "01a0a6c5-280d-7a5a-b58b-915dc1af6afa",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-bad-idea",
  ownLength: 4.451766666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Il6Oe7lr5XM7A0cWbVQtr",
      externalLink: "https://open.spotify.com/track/5Il6Oe7lr5XM7A0cWbVQtr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "bad idea",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "badidea|66CXWjxzNUsdJxJ2JdwvnR|267106",
  song: "song/ariana-grande-bad-idea",
} as const satisfies Track
