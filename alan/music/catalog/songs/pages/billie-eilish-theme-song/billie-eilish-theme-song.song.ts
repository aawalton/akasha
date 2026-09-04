import type { Song } from "../../song.page-type.ts"

export const billieEilishThemeSong = {
  id: "019ea4ac-6a5a-785d-b1c6-ece1b18beef2",
  pageTypeSlug: "song",
  slug: "billie-eilish-theme-song",
  title: "Theme Song",
  artistSlug: "billie-eilish",
  externalId: "ff565d89-2ea5-45c8-8189-a2453c187635",
  externalLink: "https://musicbrainz.org/work/ff565d89-2ea5-45c8-8189-a2453c187635",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "solo",
} as const satisfies Song
