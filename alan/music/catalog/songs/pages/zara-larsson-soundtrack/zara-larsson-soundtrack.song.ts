import type { Song } from "../../song.page-type.ts"

export const zaraLarssonSoundtrack = {
  id: "019ea4a1-23eb-7a8d-8f7c-537cd0a0435a",
  pageTypeSlug: "song",
  slug: "zara-larsson-soundtrack",
  title: "Soundtrack",
  artistSlug: "zara-larsson",
  externalId: "bb20316c-177b-42dd-8efd-550a235e1625",
  externalLink: "https://musicbrainz.org/work/bb20316c-177b-42dd-8efd-550a235e1625",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
