import type { Artist } from "../../artist.page-type.ts"

export const rockapella = {
  id: "01a06803-676c-7006-82e2-fe202a434cd6",
  pageTypeSlug: "artist",
  slug: "rockapella",
  title: "Rockapella",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "C",
  externalId: "1AFSUleuDTapVhm5zUf4ix",
  externalLink: "https://open.spotify.com/artist/1AFSUleuDTapVhm5zUf4ix",
  lastSyncedAt: "2026-03-09",
  tags: ["Classic Rock"],
} as const satisfies Artist
