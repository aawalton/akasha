import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndExtendedMixInstrumental = {
  id: "01a0a6c5-3549-7927-9a5a-b06f0aa974c0",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-extended-mix-instrumental",
  ownLength: 5.136733333333333,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3AF1Q0Ce50AsqrX6qKbZEc",
      externalLink: "https://open.spotify.com/track/3AF1Q0Ce50AsqrX6qKbZEc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - extended mix instrumental",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandextendedmixinstrumental|66CXWjxzNUsdJxJ2JdwvnR|308204",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
