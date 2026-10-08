import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const braveSingle = {
  id: "01a06803-676b-7003-bfe1-e843e3ea3d14",
  type: "page-type/artist",
  slug: "brave-single",
  title: "Brave - Single",
  partOfCollections: ["artist/byu-vocal-point"],
  position: 0,
  ownLength: 847.475,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "2013-10-24",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0jwXY6SUdlJRt7VQsOpcrk",
      externalLink: "https://open.spotify.com/album/0jwXY6SUdlJRt7VQsOpcrk",
      lastSyncedAt: "2026-03-02",
    },
  ],
  createdAt: "2026-09-03T16:04:08.683Z",
  updatedAt: "2026-09-15T15:49:56.000Z",
} as const satisfies Artist
