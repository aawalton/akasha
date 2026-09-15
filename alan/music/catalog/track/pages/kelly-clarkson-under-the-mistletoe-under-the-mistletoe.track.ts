import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonUnderTheMistletoeUnderTheMistletoe = {
  id: "01a0a5ae-d2de-7358-976d-2aa627c3c3f6",
  type: "page-type/track",
  slug: "kelly-clarkson-under-the-mistletoe-under-the-mistletoe",
  ownLength: 3.76145,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-under-the-mistletoe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2K4XbdyLxi9jhqVQeyUKRK",
      externalLink: "https://open.spotify.com/track/2K4XbdyLxi9jhqVQeyUKRK",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Under The Mistletoe",
} as const satisfies Track
