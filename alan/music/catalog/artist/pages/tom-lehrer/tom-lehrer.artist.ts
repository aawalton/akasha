import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const tomLehrer = {
  id: "01a06803-676c-7010-8d4e-a738cae65353",
  type: "page-type/artist",
  slug: "tom-lehrer",
  title: "Tom Lehrer",
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5iNvbRVX9W8t1RpD2SHpAO",
      externalLink: "https://open.spotify.com/artist/5iNvbRVX9W8t1RpD2SHpAO",
      lastSyncedAt: "2025-09-30",
    },
  ],
  tags: ["Satire"],
  createdAt: "2026-09-03T16:04:08.684Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Artist
