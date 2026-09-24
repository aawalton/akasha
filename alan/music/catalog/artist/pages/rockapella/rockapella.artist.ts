import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const rockapella = {
  id: "01a06803-676c-7006-82e2-fe202a434cd6",
  type: "page-type/artist",
  slug: "rockapella",
  title: "Rockapella",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "following",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1AFSUleuDTapVhm5zUf4ix",
      externalLink: "https://open.spotify.com/artist/1AFSUleuDTapVhm5zUf4ix",
      lastSyncedAt: "2026-09-24",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
