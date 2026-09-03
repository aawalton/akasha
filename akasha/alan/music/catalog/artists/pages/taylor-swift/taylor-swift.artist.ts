import type { Artist } from "../../artist.page-type.ts"

export const taylorSwift = {
  id: "019ea415-e8fc-73be-bc29-1dc0adc80d55",
  pageTypeSlug: "artist",
  slug: "taylor-swift",
  title: "Taylor Swift",
  externalId: "20244d07-534f-4eff-b4d4-930878889970",
  externalLink: "https://musicbrainz.org/artist/20244d07-534f-4eff-b4d4-930878889970",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: [
    "pop",
    "country",
    "country pop",
    "singer-songwriter",
    "pop rock",
    "contemporary country",
    "synth-pop",
    "indie folk",
  ],
  rank: "S",
  reaction: "txt",
} as const satisfies Artist
