import type { Artist } from "../../artist.page-type.ts"

export const michaelJackson = {
  id: "01a06803-676b-7029-876e-83ab268f9dd8",
  pageTypeSlug: "artist",
  slug: "michael-jackson",
  title: "Michael Jackson",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "C",
  externalId: "3fMbdgg4jU18AjLCKBhRSm",
  externalLink: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
  lastSyncedAt: "2025-10-04",
  tags: ["Classic Rock"],
} as const satisfies Artist
