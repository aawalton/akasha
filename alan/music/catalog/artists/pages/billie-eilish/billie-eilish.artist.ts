import type { Artist } from "akasha/alan/music/catalog/artists/artist.page-type.types.ts"

export const billieEilish = {
  id: "019ea4a8-0786-72ab-b9b7-201e500144e9",
  type: "artist",
  slug: "billie-eilish",
  title: "Billie Eilish",
  partOfCollections: ["artists"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "minutes",
  status: "following",
  genre: [
    "alternative pop",
    "electropop",
    "pop",
    "alternative r&b",
    "art pop",
    "contemporary r&b",
    "indie pop",
    "bedroom pop",
  ],
  rank: "S-",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
      externalLink: "https://musicbrainz.org/artist/f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
      lastSyncedAt: "2026-06-08",
    },
    {
      source: "spotify",
      externalId: "6qqNVTkY8uBg9cP3Jd7DAH",
      externalLink: "https://open.spotify.com/artist/6qqNVTkY8uBg9cP3Jd7DAH",
      lastSyncedAt: "2026-03-02",
    },
  ],
  tags: ["Indie Pop Storyteller"],
} as const satisfies Artist
