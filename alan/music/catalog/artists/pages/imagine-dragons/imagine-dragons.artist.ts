import type { Artist } from "../../artist.page-type.ts"

export const imagineDragons = {
  id: "019ea496-69af-7f85-bcbc-21cde8492feb",
  pageTypeSlug: "artist",
  slug: "imagine-dragons",
  title: "Imagine Dragons",
  externalId: "012151a8-0f9a-44c9-997f-ebd68b5389f9",
  externalLink: "https://musicbrainz.org/artist/012151a8-0f9a-44c9-997f-ebd68b5389f9",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: [
    "alternative rock",
    "pop rock",
    "indie pop",
    "pop",
    "alternative pop",
    "electropop",
    "indietronica",
    "rock",
  ],
  rank: "A+",
  reaction: "txt",
} as const satisfies Artist
