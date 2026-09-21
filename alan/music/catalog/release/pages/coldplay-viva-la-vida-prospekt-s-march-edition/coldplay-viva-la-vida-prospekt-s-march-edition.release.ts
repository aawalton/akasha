import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayVivaLaVidaProspektSMarchEdition = {
  id: "01a0676a-d730-7009-8465-4f6800e08e41",
  type: "page-type/release",
  slug: "coldplay-viva-la-vida-prospekt-s-march-edition",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2008-11-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4XTT0NcNHyvl6h9JX2AfEi",
      externalLink: "https://open.spotify.com/album/4XTT0NcNHyvl6h9JX2AfEi",
    },
  ],
  title: "Viva La Vida (Prospekt's March Edition)",
} as const satisfies Release
