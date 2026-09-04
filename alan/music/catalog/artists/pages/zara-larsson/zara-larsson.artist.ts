import type { Artist } from "../../artist.page-type.ts"

export const zaraLarsson = {
  id: "019ea49d-4cae-77bb-905d-4a26379e148e",
  pageTypeSlug: "artist",
  slug: "zara-larsson",
  title: "Zara Larsson",
  externalId: "134e6410-6954-45d1-bd4a-0f2d2ad5471d",
  externalLink: "https://musicbrainz.org/artist/134e6410-6954-45d1-bd4a-0f2d2ad5471d",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: [
    "dance-pop",
    "electropop",
    "contemporary r&b",
    "pop",
    "alternative pop",
    "dance",
    "disco",
    "hip hop",
  ],
} as const satisfies Artist
