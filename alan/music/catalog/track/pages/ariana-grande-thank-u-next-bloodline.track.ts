import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeThankUNextBloodline = {
  id: "01a0a6c5-27c4-7855-ae92-11ec1b9b1ee6",
  type: "page-type/track",
  slug: "ariana-grande-thank-u-next-bloodline",
  ownLength: 3.6148833333333332,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-thank-u-next"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2hloaUoRonYssMuqLCBLTX",
      externalLink: "https://open.spotify.com/track/2hloaUoRonYssMuqLCBLTX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "bloodline",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "bloodline|66CXWjxzNUsdJxJ2JdwvnR|216893",
  song: "song/ariana-grande-bloodline",
} as const satisfies Track
