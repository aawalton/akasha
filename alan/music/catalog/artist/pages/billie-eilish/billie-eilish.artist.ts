import type { Artist } from "akasha/alan/music/catalog/artist/artist.page-type.types.ts"

export const billieEilish = {
  id: "019ea4a8-0786-72ab-b9b7-201e500144e9",
  type: "page-type/artist",
  slug: "billie-eilish",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist-collection/artists"],
  position: 0,
  rank: "S-",
  status: "following",
  tags: ["Indie Pop Storyteller"],
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
      externalLink: "https://musicbrainz.org/artist/f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
      lastSyncedAt: "2026-09-19",
    },
    {
      source: "spotify",
      externalId: "6qqNVTkY8uBg9cP3Jd7DAH",
      externalLink: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Billie Eilish",
  genre: [
    "electropop",
    "alternative pop",
    "pop",
    "alternative r&b",
    "art pop",
    "bedroom pop",
    "contemporary r&b",
    "indie pop",
  ],
} as const satisfies Artist
