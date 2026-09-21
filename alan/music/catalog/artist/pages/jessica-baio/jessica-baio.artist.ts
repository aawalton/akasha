import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const jessicaBaio = {
  id: "019ea4ce-bf16-7163-9e22-929cfc2ff07f",
  type: "page-type/artist",
  slug: "jessica-baio",
  grade: "A",
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
      externalId: "fddc6fba-d749-483e-a816-296962a11789",
      externalLink: "https://musicbrainz.org/artist/fddc6fba-d749-483e-a816-296962a11789",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "0VMFTqmv0hYlWruyBERT95",
      externalLink: "https://open.spotify.com/artist/0VMFTqmv0hYlWruyBERT95",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Jessica Baio",
} as const satisfies Artist
