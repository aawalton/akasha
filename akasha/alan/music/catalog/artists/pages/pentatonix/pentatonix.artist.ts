import type { Artist } from "../../artist.page-type.ts"

export const pentatonix = {
  id: "01a06803-676c-7003-af76-ca9b4c453f63",
  pageTypeSlug: "artist",
  slug: "pentatonix",
  title: "Pentatonix",
  partOfSlugs: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "following",
  rank: "B",
  externalId: "26AHtbjWKiwYzsoGoUZq53",
  externalLink: "https://open.spotify.com/artist/26AHtbjWKiwYzsoGoUZq53",
  lastSyncedAt: "2026-02-09",
  tags: ["Instrumental"],
} as const satisfies Artist
