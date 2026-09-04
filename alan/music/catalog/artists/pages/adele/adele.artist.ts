import type { Artist } from "../../artist.page-type.ts"

export const adele = {
  id: "01a06803-676a-7000-abb8-8dc73e08c3fa",
  pageTypeSlug: "artist",
  slug: "adele",
  title: "Adele",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "B",
  externalId: "4dpARuHxo51G3z768sgnrY",
  externalLink: "https://open.spotify.com/artist/4dpARuHxo51G3z768sgnrY",
  lastSyncedAt: "2026-03-13",
} as const satisfies Artist
