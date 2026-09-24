import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const ejae = {
  id: "01a06803-676b-7009-8e70-d18d53808cd9",
  type: "page-type/artist",
  slug: "ejae",
  grade: "A",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["K-Pop", "Modern Pop"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0RMJOzHDhAKY1o2j0W0vxY",
      externalLink: "https://open.spotify.com/artist/0RMJOzHDhAKY1o2j0W0vxY",
      lastSyncedAt: "2026-09-24",
    },
  ],
  title: "EJAE",
} as const satisfies Artist
