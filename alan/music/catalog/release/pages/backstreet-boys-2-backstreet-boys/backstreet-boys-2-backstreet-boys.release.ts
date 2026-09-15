import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const backstreetBoys2BackstreetBoys = {
  id: "01a0676a-d718-7001-ae83-b1ec0bf7570a",
  type: "page-type/release",
  slug: "backstreet-boys-2-backstreet-boys",
  title: "Backstreet Boys",
  partOfCollections: ["artist/backstreet-boys"],
  position: 0,
  ownLength: 52.1688,
  ownProgress: 52.1688,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1996-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0wvQovgaVU99eqw8n3g22S",
      externalLink: "https://open.spotify.com/album/0wvQovgaVU99eqw8n3g22S",
    },
  ],
} as const satisfies Release
