import type { Artist } from "../../artist.page-type.ts"

export const sia = {
  id: "019ea4c1-b005-73a3-8bc3-079ae41ed5e9",
  pageTypeSlug: "artist",
  slug: "sia",
  title: "Sia",
  externalId: "2f548675-008d-4332-876c-108b0c7ab9c5",
  externalLink: "https://musicbrainz.org/artist/2f548675-008d-4332-876c-108b0c7ab9c5",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: ["pop", "electropop", "dance-pop", "indie pop", "alternative pop", "art pop"],
  rank: "S-",
  reaction: "txt",
} as const satisfies Artist
