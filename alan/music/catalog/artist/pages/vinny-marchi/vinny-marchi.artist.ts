import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const vinnyMarchi = {
  id: "01a06803-676c-7011-ac08-53a302031f1d",
  type: "page-type/artist",
  slug: "vinny-marchi",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "B",
  status: "following",
  tags: ["Folk"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "888e374a-b1ce-4730-bf5e-05b0758eb9a3",
      externalLink: "https://musicbrainz.org/artist/888e374a-b1ce-4730-bf5e-05b0758eb9a3",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "5USAMqcbMAzF3HBmeD5pJF",
      externalLink: "https://open.spotify.com/artist/5USAMqcbMAzF3HBmeD5pJF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Vinny Marchi",
  genre: [],
} as const satisfies Artist
