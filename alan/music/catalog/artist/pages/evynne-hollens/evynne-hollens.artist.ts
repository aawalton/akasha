import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const evynneHollens = {
  id: "019ea4ce-df22-7041-8d45-35caf3120d77",
  type: "page-type/artist",
  slug: "evynne-hollens",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "02c48970-d78f-449c-a391-bbf22a7fddfc",
      externalLink: "https://musicbrainz.org/artist/02c48970-d78f-449c-a391-bbf22a7fddfc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Evynne Hollens",
  genre: [],
  createdAt: "2026-06-08T01:18:01.506Z",
  updatedAt: "2026-09-19T17:05:46.000Z",
} as const satisfies Artist
