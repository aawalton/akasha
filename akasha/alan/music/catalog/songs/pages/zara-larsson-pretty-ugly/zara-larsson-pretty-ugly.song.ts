import type { Song } from "../../song.page-type.ts"

export const zaraLarssonPrettyUgly = {
  id: "019ea49e-7e6b-7332-a07f-5675fb93c53e",
  pageTypeSlug: "song",
  slug: "zara-larsson-pretty-ugly",
  title: "Pretty Ugly",
  artistSlug: "zara-larsson",
  externalId: "244e97ee-16b9-4d39-8c03-e32499867512",
  externalLink: "https://musicbrainz.org/work/244e97ee-16b9-4d39-8c03-e32499867512",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
