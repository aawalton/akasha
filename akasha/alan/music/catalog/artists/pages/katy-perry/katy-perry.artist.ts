import type { Artist } from "../../artist.page-type.ts"

export const katyPerry = {
  id: "01a06803-676b-701f-96d7-4d889beed1ae",
  pageTypeSlug: "artist",
  slug: "katy-perry",
  title: "Katy Perry",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "D",
  externalId: "6jJ0s89eD6GaHleKKya26X",
  externalLink: "https://open.spotify.com/artist/6jJ0s89eD6GaHleKKya26X",
  lastSyncedAt: "2025-09-30",
  tags: ["Modern Pop"],
} as const satisfies Artist
