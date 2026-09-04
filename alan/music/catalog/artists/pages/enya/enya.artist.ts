import type { Artist } from "../../artist.page-type.ts"

export const enya = {
  id: "01a06803-676b-700e-b5dc-e19c81a95c3b",
  pageTypeSlug: "artist",
  slug: "enya",
  title: "Enya",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "A",
  externalId: "6uothxMWeLWIhsGeF7cyo4",
  externalLink: "https://open.spotify.com/artist/6uothxMWeLWIhsGeF7cyo4",
  lastSyncedAt: "2026-02-14",
  tags: ["Celtic"],
} as const satisfies Artist
