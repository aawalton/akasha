import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterManchild = {
  id: "01a0676a-d724-7034-9cbc-816677090866",
  type: "page-type/release",
  slug: "sabrina-carpenter-manchild",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2025-06-05",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3wRHV5fOeUcM5hvYzWZsic",
      externalLink: "https://open.spotify.com/album/3wRHV5fOeUcM5hvYzWZsic",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Manchild",
} as const satisfies Release
