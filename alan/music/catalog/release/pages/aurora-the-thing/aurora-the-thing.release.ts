import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const auroraTheThing = {
  id: "01a0676a-d72e-7015-a3b6-2367e26e899c",
  type: "page-type/release",
  slug: "aurora-the-thing",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/aurora"],
  position: 0,
  publishedAt: "2026-01-15",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3tMKgaUzzhqpoB7RxI5hDI",
      externalLink: "https://open.spotify.com/album/3tMKgaUzzhqpoB7RxI5hDI",
      lastSyncedAt: "2026-01-31",
    },
  ],
  title: "THE THING",
} as const satisfies Release
