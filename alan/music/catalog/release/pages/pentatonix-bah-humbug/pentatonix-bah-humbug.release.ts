import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const pentatonixBahHumbug = {
  id: "01a0676a-d718-7011-95f1-886e01c381e6",
  type: "release",
  slug: "pentatonix-bah-humbug",
  title: "Bah Humbug",
  partOfCollections: ["artist/pentatonix"],
  position: 0,
  ownLength: 3.826567,
  ownProgress: 3.826567,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-09-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "14qiH7IopCWCBIiG5Dacqn",
      externalLink: "https://open.spotify.com/album/14qiH7IopCWCBIiG5Dacqn",
    },
  ],
} as const satisfies Release
