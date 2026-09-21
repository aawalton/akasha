import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const michaelJackson = {
  id: "01a06803-676b-7029-876e-83ab268f9dd8",
  type: "page-type/artist",
  slug: "michael-jackson",
  title: "Michael Jackson",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  grade: "C",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3fMbdgg4jU18AjLCKBhRSm",
      externalLink: "https://open.spotify.com/artist/3fMbdgg4jU18AjLCKBhRSm",
      lastSyncedAt: "2025-10-04",
    },
  ],
  tags: ["Classic Rock"],
} as const satisfies Artist
