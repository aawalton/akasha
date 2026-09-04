import type { Artist } from "../../artist.page-type.ts"

export const kellyClarkson = {
  id: "019ea4ac-72f8-7756-9707-4c6895f71eed",
  pageTypeSlug: "artist",
  slug: "kelly-clarkson",
  title: "Kelly Clarkson",
  externalId: "d339efbb-77b9-4147-ba9e-59f2f24550b2",
  externalLink: "https://musicbrainz.org/artist/d339efbb-77b9-4147-ba9e-59f2f24550b2",
  unitSlug: "minutes",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  genre: ["pop", "pop rock"],
} as const satisfies Artist
