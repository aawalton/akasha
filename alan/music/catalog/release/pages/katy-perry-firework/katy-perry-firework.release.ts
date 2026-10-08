import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const katyPerryFirework = {
  id: "01a0676a-d71e-7000-95cb-a31874e20455",
  type: "page-type/release",
  slug: "katy-perry-firework",
  title: "Firework",
  partOfCollections: ["artist/katy-perry"],
  position: 0,
  ownLength: 0.503867,
  ownProgress: 0.503867,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2010-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2oKE3HhxPaI0EsUBajZHJg",
      externalLink: "https://open.spotify.com/album/2oKE3HhxPaI0EsUBajZHJg",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-09-15T16:37:02.000Z",
} as const satisfies Release
