import type { Song } from "../../song.page-type.ts"

export const billieEilishBad = {
  id: "019ea4ab-0c4d-7d43-80f8-18cb9df7d62a",
  pageTypeSlug: "song",
  slug: "billie-eilish-bad",
  title: "Bad",
  artistSlug: "billie-eilish",
  externalId: "b06efbd2-1520-37d8-bb17-c27093451c42",
  externalLink: "https://musicbrainz.org/work/b06efbd2-1520-37d8-bb17-c27093451c42",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
