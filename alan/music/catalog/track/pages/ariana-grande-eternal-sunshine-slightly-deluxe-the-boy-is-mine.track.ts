import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeTheBoyIsMine = {
  id: "01a0a6c5-1962-717b-86f4-548415379c8a",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-the-boy-is-mine",
  ownLength: 2.8939833333333334,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "19nGr45kS0vRbuWeEnarRW",
      externalLink: "https://open.spotify.com/track/19nGr45kS0vRbuWeEnarRW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "the boy is mine",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "theboyismine|66CXWjxzNUsdJxJ2JdwvnR|173639",
  song: "song/ariana-grande-the-boy-is-mine-2",
} as const satisfies Track
