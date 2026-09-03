import type { Artist } from "../../artist.page-type.ts"

export const billieEilish = {
  id: "019ea4a8-0786-72ab-b9b7-201e500144e9",
  pageTypeSlug: "artist",
  slug: "billie-eilish",
  title: "Billie Eilish",
  externalId: "f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
  externalLink: "https://musicbrainz.org/artist/f4abc0b5-3f7a-4eff-8f78-ac078dbce533",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
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
} as const satisfies Artist
