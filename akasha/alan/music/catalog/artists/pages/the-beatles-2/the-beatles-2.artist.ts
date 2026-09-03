import type { Artist } from "../../artist.page-type.ts"

export const theBeatles2 = {
  id: "01a06803-676c-700c-9dae-14c7db84f5b7",
  pageTypeSlug: "artist",
  slug: "the-beatles-2",
  title: "The Beatles",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "D",
  externalId: "3WrFJ7ztbogyGnTHbHJFl2",
  externalLink: "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2",
  lastSyncedAt: "2025-09-30",
  tags: ["Classic Rock"],
} as const satisfies Artist
