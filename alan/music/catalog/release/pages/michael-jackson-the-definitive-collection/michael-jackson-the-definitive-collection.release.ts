import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const michaelJacksonTheDefinitiveCollection = {
  id: "01a0676a-d72d-7000-ac41-95bc98ea10f8",
  type: "page-type/release",
  slug: "michael-jackson-the-definitive-collection",
  title: "The Definitive Collection",
  partOfCollections: ["artist/michael-jackson"],
  position: 0,
  ownLength: 65.418567,
  ownProgress: 65.418567,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2009-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1taiwc7i9KsE0GklRJ42HS",
      externalLink: "https://open.spotify.com/album/1taiwc7i9KsE0GklRJ42HS",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
