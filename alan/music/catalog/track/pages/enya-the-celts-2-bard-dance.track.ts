import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaTheCelts2BardDance = {
  id: "01a0a5b0-21c2-7d2f-a40a-b42e7338f2fc",
  type: "page-type/track",
  slug: "enya-the-celts-2-bard-dance",
  ownLength: 1.4151,
  ownProgress: 0,
  partOfCollections: ["release/enya-the-celts-2"],
  position: 13,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0lm0rizD3o0PUhJjf3owjc",
      externalLink: "https://open.spotify.com/track/0lm0rizD3o0PUhJjf3owjc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Bard Dance",
} as const satisfies Track
