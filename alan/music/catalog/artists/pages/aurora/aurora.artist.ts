import type { Artist } from "../../artist.page-type.ts"

export const aurora = {
  id: "019ea4a2-bf94-7e76-9b55-055406f66eb9",
  pageTypeSlug: "artist",
  slug: "aurora",
  title: "AURORA",
  externalId: "484a4e90-6899-4e4b-a948-a2255d365340",
  externalLink: "https://musicbrainz.org/artist/484a4e90-6899-4e4b-a948-a2255d365340",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: [
    "indie pop",
    "art pop",
    "dream pop",
    "chamber pop",
    "folktronica",
    "pop",
    "synth-pop",
    "afro house",
  ],
  rank: "A+",
  reaction: "txt",
} as const satisfies Artist
