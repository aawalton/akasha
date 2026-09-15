import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChristmastryGlow = {
  id: "01a0a5ae-cebb-796a-9069-d4a13e05c97b",
  type: "page-type/track",
  slug: "kelly-clarkson-christmastry-glow",
  ownLength: 3.30465,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-christmastry"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3vjdUWAQBltO1jafrMhTiF",
      externalLink: "https://open.spotify.com/track/3vjdUWAQBltO1jafrMhTiF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Glow",
} as const satisfies Track
