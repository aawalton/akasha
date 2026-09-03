import type { Artist } from "../../artist.page-type.ts"

export const epicTheMusical = {
  id: "01a06803-676b-700f-b172-404ed94c6bfa",
  pageTypeSlug: "artist",
  slug: "epic-the-musical",
  title: "Epic: The Musical",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  externalId: "2kdmTOXncgNHSuYVMhdd5I",
  externalLink: "https://open.spotify.com/artist/2kdmTOXncgNHSuYVMhdd5I",
  lastSyncedAt: "2025-09-30",
  tags: ["Musical Theater"],
} as const satisfies Artist
