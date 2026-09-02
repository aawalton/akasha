import type { Song } from "../../song.page-type.ts"

export const siaDistractions = {
  id: "019ea4c3-2eb7-794d-8de1-09452f3caeef",
  pageTypeSlug: "song",
  slug: "sia-distractions",
  title: "Distractions",
  artistSlug: "sia",
  externalId: "288b866f-74d4-4c6c-82f8-839958570e55",
  externalLink: "https://musicbrainz.org/work/288b866f-74d4-4c6c-82f8-839958570e55",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
