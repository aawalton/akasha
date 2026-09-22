import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const lilithMax = {
  id: "019ea4de-a4a8-755f-9d89-5f375589f6e0",
  type: "page-type/artist",
  slug: "lilith-max",
  grade: "B",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "875cba95-c7a7-491c-964d-171c931c32e5",
      externalLink: "https://musicbrainz.org/artist/875cba95-c7a7-491c-964d-171c931c32e5",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "797SPxZf82IYq3XCM8c9AM",
      externalLink: "https://open.spotify.com/artist/797SPxZf82IYq3XCM8c9AM",
      lastSyncedAt: "2026-09-22",
    },
  ],
  title: "Lilith Max",
} as const satisfies Artist
