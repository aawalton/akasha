import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeOneLastTimeOneLastTimeACappella = {
  id: "01a0a6c5-3cab-7a2a-b240-d97609c7dd59",
  type: "page-type/track",
  slug: "ariana-grande-one-last-time-one-last-time-a-cappella",
  ownLength: 3.314766666666667,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-one-last-time"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1FbQhFSuQErbCGRwY61jxA",
      externalLink: "https://open.spotify.com/track/1FbQhFSuQErbCGRwY61jxA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Last Time - A Cappella",
  trackType: "a-cappella",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "onelasttimeacappella|66CXWjxzNUsdJxJ2JdwvnR|198886",
  song: "song/ariana-grande-one-last-time",
} as const satisfies Track
