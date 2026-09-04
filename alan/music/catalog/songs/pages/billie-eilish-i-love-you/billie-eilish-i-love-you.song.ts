import type { Song } from "../../song.page-type.ts"

export const billieEilishILoveYou = {
  id: "019ea4ab-7ca0-7f89-8dd8-62e3c73485a3",
  pageTypeSlug: "song",
  slug: "billie-eilish-i-love-you",
  title: "i love you",
  artistSlug: "billie-eilish",
  externalId: "d891402b-0bac-4707-a017-b164b56e8808",
  externalLink: "https://musicbrainz.org/work/d891402b-0bac-4707-a017-b164b56e8808",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
