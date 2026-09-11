import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const rockapella = {
  id: "01a06803-676c-7006-82e2-fe202a434cd6",
  type: "artist",
  slug: "rockapella",
  title: "Rockapella",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  rank: "C",
  externalId: "1AFSUleuDTapVhm5zUf4ix",
  externalLink: "https://open.spotify.com/artist/1AFSUleuDTapVhm5zUf4ix",
  lastSyncedAt: "2026-03-09",
  tags: ["Classic Rock"],
} as const satisfies Artist
