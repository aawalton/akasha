import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const kellyClarkson = {
  id: "019ea4ac-72f8-7756-9707-4c6895f71eed",
  type: "artist",
  slug: "kelly-clarkson",
  title: "Kelly Clarkson",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  rank: "B",
  genre: ["pop", "pop rock"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d339efbb-77b9-4147-ba9e-59f2f24550b2",
      externalLink: "https://musicbrainz.org/artist/d339efbb-77b9-4147-ba9e-59f2f24550b2",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "3BmGtnKgCSGYIUhmivXKWX",
      externalLink: "https://open.spotify.com/artist/3BmGtnKgCSGYIUhmivXKWX",
      lastSyncedAt: "2026-02-13",
    },
  ],
} as const satisfies Artist
