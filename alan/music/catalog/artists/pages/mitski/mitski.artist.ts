import type { Artist } from "../../artist.page-type.ts"

export const mitski = {
  id: "019f0e9b-d5e2-7a33-ac50-7cc143ec870a",
  pageTypeSlug: "artist",
  slug: "mitski",
  title: "Mitski",
  externalId: "fa58cf24-0e44-421d-8519-8bf461dcfaa5",
  externalLink: "https://musicbrainz.org/artist/fa58cf24-0e44-421d-8519-8bf461dcfaa5",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  genre: [
    "indie rock",
    "rock",
    "singer-songwriter",
    "alternative rock",
    "garage rock",
    "art pop",
    "folk punk",
    "folk rock",
  ],
  rank: "B+",
  reaction: "txt",
} as const satisfies Artist
