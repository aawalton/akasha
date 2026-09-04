import type { Song } from "../../song.page-type.ts"

export const mitskiDanTheDancer = {
  id: "019f0ea7-ef8d-7214-8ca0-bcbccf136756",
  pageTypeSlug: "song",
  slug: "mitski-dan-the-dancer",
  title: "Dan the Dancer",
  artistSlug: "mitski",
  externalId: "e9e78e2d-e652-48d4-a387-3f3c96fea6e5",
  externalLink: "https://musicbrainz.org/work/e9e78e2d-e652-48d4-a387-3f3c96fea6e5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
