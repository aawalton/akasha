import type { Artist } from "../../artist.page-type.ts"

export const linkinPark = {
  id: "01a06803-676b-7026-9fda-d9e54409307d",
  pageTypeSlug: "artist",
  slug: "linkin-park",
  title: "Linkin Park",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "C",
  externalId: "6XyY86QOPPrYVGvF9ch6wz",
  externalLink: "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz",
  lastSyncedAt: "2025-09-30",
  tags: ["Alternative Rock"],
} as const satisfies Artist
