import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonGlowGlow = {
  id: "01a0a5ae-d24e-7ab9-8fd1-a051a4383ce6",
  type: "page-type/track",
  slug: "kelly-clarkson-glow-glow",
  ownLength: 3.30465,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-glow"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0l8jM3qhcrH0ecBbU9BCWR",
      externalLink: "https://open.spotify.com/track/0l8jM3qhcrH0ecBbU9BCWR",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Glow",
} as const satisfies Track
