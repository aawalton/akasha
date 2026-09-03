import type { Artist } from "../../artist.page-type.ts"

export const coldplay = {
  id: "01a06803-676b-7008-bce3-0dbae6d3edc7",
  pageTypeSlug: "artist",
  slug: "coldplay",
  title: "Coldplay",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "B",
  externalId: "4gzpq5DPGxSnKTe4SA8HAU",
  externalLink: "https://open.spotify.com/artist/4gzpq5DPGxSnKTe4SA8HAU",
  lastSyncedAt: "2026-03-02",
  tags: ["Alternative Rock"],
} as const satisfies Artist
