import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndExtendedMix = {
  id: "01a0a6c5-34ac-703e-befd-af67d7c37d14",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-extended-mix",
  ownLength: 5.136733333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "12SdfiD7MIRteeIXWdvxpl",
      externalLink: "https://open.spotify.com/track/12SdfiD7MIRteeIXWdvxpl",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - extended mix",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandextendedmix|66CXWjxzNUsdJxJ2JdwvnR|308204",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
