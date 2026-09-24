import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const adele21 = {
  id: "01a0676a-d714-7024-9380-d317af4dcee9",
  type: "page-type/release",
  slug: "adele-21",
  title: "21",
  partOfCollections: ["artist/adele"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2011-01-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0Lg1uZvI312TPqxNWShFXL",
      externalLink: "https://open.spotify.com/album/0Lg1uZvI312TPqxNWShFXL",
      lastSyncedAt: "2026-02-09",
    },
  ],
} as const satisfies Release
