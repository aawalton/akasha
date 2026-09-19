import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const sylviaDaley = {
  id: "01a06803-676c-700a-a8bc-f7583737dc27",
  type: "page-type/artist",
  slug: "sylvia-daley",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "A",
  status: "following",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7fcc0427-9092-42d7-8011-ab96b6432b3f",
      externalLink: "https://musicbrainz.org/artist/7fcc0427-9092-42d7-8011-ab96b6432b3f",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "03dXd2zBbBJvX60Oap8Lgo",
      externalLink: "https://open.spotify.com/artist/03dXd2zBbBJvX60Oap8Lgo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Sylvia Daley",
  genre: ["pop", "singer-songwriter"],
} as const satisfies Artist
