import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const theWickedOrchestra = {
  id: "01a0b7a4-217b-7e50-828f-2fcb08eb36b4",
  type: "page-type/artist",
  slug: "the-wicked-orchestra",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0bVjGR347nlhO79Z3i881P",
      externalLink: "https://open.spotify.com/artist/0bVjGR347nlhO79Z3i881P",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Wicked Orchestra",
  createdAt: "2026-09-19T03:09:42.139Z",
  updatedAt: "2026-09-19T03:10:54.000Z",
} as const satisfies Artist
