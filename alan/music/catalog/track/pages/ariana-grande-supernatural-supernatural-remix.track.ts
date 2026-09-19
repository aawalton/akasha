import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeSupernaturalSupernaturalRemix = {
  id: "01a0a6c5-312e-732e-b242-6e88bdf9e32f",
  type: "page-type/track",
  slug: "ariana-grande-supernatural-supernatural-remix",
  ownLength: 2.7230166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-supernatural"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6GVSrGzoVDTHqb5n8hAIHU",
      externalLink: "https://open.spotify.com/track/6GVSrGzoVDTHqb5n8hAIHU",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural - remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "3WGpXCj9YhhfX11TToZcXP", artistName: "Troye Sivan" },
  ],
  trackKey: "supernaturalremix|3WGpXCj9YhhfX11TToZcXP,66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural-2",
} as const satisfies Track
