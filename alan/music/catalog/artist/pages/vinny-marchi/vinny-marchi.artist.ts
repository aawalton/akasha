import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const vinnyMarchi = {
  id: "01a06803-676c-7011-ac08-53a302031f1d",
  type: "page-type/artist",
  slug: "vinny-marchi",
  title: "Vinny Marchi",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  rank: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5USAMqcbMAzF3HBmeD5pJF",
      externalLink: "https://open.spotify.com/artist/5USAMqcbMAzF3HBmeD5pJF",
      lastSyncedAt: "2026-02-25",
    },
  ],
  tags: ["Folk"],
} as const satisfies Artist
