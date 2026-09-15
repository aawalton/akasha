import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenWildchildSameStars = {
  id: "01a0a59d-c751-7c4e-b3e1-e3a828a6cbf2",
  type: "track",
  slug: "alex-warren-wildchild-same-stars",
  ownLength: 3.330966666666667,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-wildchild"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "06sZjwAy4DTJfpOuel7nv4",
      externalLink: "https://open.spotify.com/track/06sZjwAy4DTJfpOuel7nv4",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "SAME STARS",
} as const satisfies Track
