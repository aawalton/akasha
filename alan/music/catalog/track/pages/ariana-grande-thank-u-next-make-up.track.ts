import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextMakeUp = {
  id: "01a0a6c5-2832-71ff-b27e-1e128af60607",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-make-up",
  ownLength: 2.344883333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "27356GVuMPFWiJSZCragoM",
      externalLink: "https://open.spotify.com/track/27356GVuMPFWiJSZCragoM",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "make up",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "makeup|66CXWjxzNUsdJxJ2JdwvnR|140693",
  song: "song/ariana-grande-make-up",
} as const satisfies Track
