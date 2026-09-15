import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaDynamiteDynamite = {
  id: "01a0a59c-28e8-71a7-b8c1-322131c178c3",
  type: "page-type/track",
  slug: "sia-dynamite-dynamite",
  ownLength: 3.5444666666666667,
  ownProgress: 0,
  partOfCollections: ["release/sia-dynamite"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0fQfJFfngYfG26560HLMLN",
      externalLink: "https://open.spotify.com/track/0fQfJFfngYfG26560HLMLN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dynamite",
} as const satisfies Track
