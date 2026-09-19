import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const kellyClarkson = {
  id: "019ea4ac-72f8-7756-9707-4c6895f71eed",
  type: "page-type/artist",
  slug: "kelly-clarkson",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d339efbb-77b9-4147-ba9e-59f2f24550b2",
      externalLink: "https://musicbrainz.org/artist/d339efbb-77b9-4147-ba9e-59f2f24550b2",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "3BmGtnKgCSGYIUhmivXKWX",
      externalLink: "https://open.spotify.com/artist/3BmGtnKgCSGYIUhmivXKWX",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Kelly Clarkson",
  genre: ["pop", "pop rock"],
} as const satisfies Artist
