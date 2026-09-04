import type { Artist } from "../../artist.page-type.ts"

export const arianaGrande = {
  id: "019ea4df-daa1-7e32-acb9-6cea0dfd1807",
  pageTypeSlug: "artist",
  slug: "ariana-grande",
  title: "Ariana Grande",
  externalId: "f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
  externalLink: "https://musicbrainz.org/artist/f4fdbb4c-e4b7-47a0-b83b-d91bbfcfa387",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: ["pop", "r&b", "dance-pop", "contemporary r&b", "trap soul"],
} as const satisfies Artist
