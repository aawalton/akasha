import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const coldplayOvertura = {
  id: "01a0676a-d726-7056-8c3c-1a2b2ab27e5a",
  type: "page-type/release",
  slug: "coldplay-overtura",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/coldplay"],
  position: 0,
  publishedAt: "2021-07-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2D9sJsmo3tSSxkxrMkEoei",
      externalLink: "https://open.spotify.com/album/2D9sJsmo3tSSxkxrMkEoei",
    },
  ],
  title: "Overtura",
} as const satisfies Release
