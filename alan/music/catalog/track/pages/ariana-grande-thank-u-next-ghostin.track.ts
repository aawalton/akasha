import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextGhostin = {
  id: "01a0a6c5-2857-76e5-92de-160cc1de8890",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-ghostin",
  ownLength: 4.5244333333333335,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2vdBo4ALPYbHRUPKgtE5iC",
      externalLink: "https://open.spotify.com/track/2vdBo4ALPYbHRUPKgtE5iC",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "ghostin",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "ghostin|66CXWjxzNUsdJxJ2JdwvnR|271466",
} as const satisfies Track
