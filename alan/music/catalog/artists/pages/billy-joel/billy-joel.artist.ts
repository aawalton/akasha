import type { Artist } from "../../artist.page-type.ts"

export const billyJoel = {
  id: "01a06803-676b-7002-a3eb-aaec816b0225",
  pageTypeSlug: "artist",
  slug: "billy-joel",
  title: "Billy Joel",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "C",
  externalId: "6zFYqv1mOsgBRQbae3JJ9e",
  externalLink: "https://open.spotify.com/artist/6zFYqv1mOsgBRQbae3JJ9e",
  lastSyncedAt: "2025-09-30",
  tags: ["Classic Rock"],
} as const satisfies Artist
