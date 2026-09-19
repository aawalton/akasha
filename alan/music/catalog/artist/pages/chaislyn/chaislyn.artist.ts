import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const chaislyn = {
  id: "019ea4cf-6ea5-77cd-9d9f-e55bf47b85af",
  type: "page-type/artist",
  slug: "chaislyn",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df81c5a4-e7f4-4e2e-b1de-60157a324218",
      externalLink: "https://musicbrainz.org/artist/df81c5a4-e7f4-4e2e-b1de-60157a324218",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "3zmbniiciaBAJlSX1Bzq9R",
      externalLink: "https://open.spotify.com/artist/3zmbniiciaBAJlSX1Bzq9R",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chaislyn",
} as const satisfies Artist
