import type { Song } from "../../song.page-type.ts"

export const billieEilishIlomilo = {
  id: "019ea4aa-1cf0-7ad2-80c7-5e3488602093",
  pageTypeSlug: "song",
  slug: "billie-eilish-ilomilo",
  title: "ilomilo",
  artistSlug: "billie-eilish",
  externalId: "79df5dad-8c17-41c4-b706-5fe5c9b6c9c3",
  externalLink: "https://musicbrainz.org/work/79df5dad-8c17-41c4-b706-5fe5c9b6c9c3",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
