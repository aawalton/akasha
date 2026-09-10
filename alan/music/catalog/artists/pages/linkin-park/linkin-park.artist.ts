import type { Artist } from "../../artist.page-type.types.ts"

export const linkinPark = {
  id: "01a06803-676b-7026-9fda-d9e54409307d",
  pageTypeSlug: "artist",
  type: "artist",
  slug: "linkin-park",
  title: "Linkin Park",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "archived",
  rank: "C",
  externalId: "6XyY86QOPPrYVGvF9ch6wz",
  externalLink: "https://open.spotify.com/artist/6XyY86QOPPrYVGvF9ch6wz",
  lastSyncedAt: "2025-09-30",
  tags: ["Alternative Rock"],
} as const satisfies Artist
