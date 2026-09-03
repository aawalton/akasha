import type { Artist } from "../../artist.page-type.ts"

export const metallica = {
  id: "01a06803-676b-7028-89e8-12ba4e4e388f",
  pageTypeSlug: "artist",
  slug: "metallica",
  title: "Metallica",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  rank: "C",
  externalId: "2ye2Wgw4gimLv2eAKyk1NB",
  externalLink: "https://open.spotify.com/artist/2ye2Wgw4gimLv2eAKyk1NB",
  lastSyncedAt: "2025-09-30",
  tags: ["Alternative Rock"],
} as const satisfies Artist
