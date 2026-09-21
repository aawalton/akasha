import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const pentatonix = {
  id: "01a06803-676c-7003-af76-ca9b4c453f63",
  type: "page-type/artist",
  slug: "pentatonix",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  grade: "B",
  status: "following",
  tags: ["Instrumental"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "26AHtbjWKiwYzsoGoUZq53",
      externalLink: "https://open.spotify.com/artist/26AHtbjWKiwYzsoGoUZq53",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Pentatonix",
} as const satisfies Artist
