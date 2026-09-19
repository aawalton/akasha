import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeYesAndYesAndACappella = {
  id: "01a0a6c5-34e8-7c79-9241-b5f0ada8d1ff",
  type: "page-type/track",
  slug: "ariana-grande-yes-and-yes-and-a-cappella",
  ownLength: 3.2775166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-yes-and"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61qw8LTaRFn11q37hQB6ns",
      externalLink: "https://open.spotify.com/track/61qw8LTaRFn11q37hQB6ns",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "yes, and? - a cappella",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "yesandacappella|66CXWjxzNUsdJxJ2JdwvnR|196651",
  song: "song/ariana-grande-yes-and-2",
} as const satisfies Track
