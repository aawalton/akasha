import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jonathanBailey = {
  id: "01a0b7a4-2179-7b3b-be55-e10d25a43c57",
  type: "page-type/artist",
  slug: "jonathan-bailey",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Je7IdIHe8UvZbLXdapQ26",
      externalLink: "https://open.spotify.com/artist/2Je7IdIHe8UvZbLXdapQ26",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jonathan Bailey",
  createdAt: "2026-09-19T03:09:42.137Z",
  updatedAt: "2026-09-19T03:10:54.000Z",
} as const satisfies Artist
