import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const nsync = {
  id: "01a06803-676c-7001-b569-8494638e9b28",
  type: "page-type/artist",
  slug: "nsync",
  title: "*NSYNC",
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
      externalId: "6Ff53KvcvAj5U7Z1vojB5o",
      externalLink: "https://open.spotify.com/artist/6Ff53KvcvAj5U7Z1vojB5o",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Boy Bands"],
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
