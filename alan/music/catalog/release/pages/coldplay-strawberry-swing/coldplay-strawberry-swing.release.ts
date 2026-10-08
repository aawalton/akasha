import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayStrawberrySwing = {
  id: "01a0676a-d72a-702d-b629-28f0123d6160",
  type: "page-type/release",
  slug: "coldplay-strawberry-swing",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2009-09-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5JyRcNcdZ8uf5vGH4b6ljZ",
      externalLink: "https://open.spotify.com/album/5JyRcNcdZ8uf5vGH4b6ljZ",
    },
  ],
  title: "Strawberry Swing",
  createdAt: "2026-09-03T13:17:30.282Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
