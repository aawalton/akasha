import type { Song } from "../../song.page-type.ts"

export const auroraSideBySide = {
  id: "019ea4a5-156c-7f71-bd4c-9d5f7743509b",
  pageTypeSlug: "song",
  slug: "aurora-side-by-side",
  title: "SIDE BY SIDE",
  artistSlug: "aurora",
  externalId: "54071568-fdbe-4a91-8eea-223c157b345a",
  externalLink: "https://musicbrainz.org/work/54071568-fdbe-4a91-8eea-223c157b345a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
