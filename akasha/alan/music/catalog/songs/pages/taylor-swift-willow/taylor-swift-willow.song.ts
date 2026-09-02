import type { Song } from "../../song.page-type.ts"

export const taylorSwiftWillow = {
  id: "019ea416-4b0f-7956-b133-4e311e9579f6",
  pageTypeSlug: "song",
  slug: "taylor-swift-willow",
  title: "willow",
  artistSlug: "taylor-swift",
  externalId: "d4333f22-db44-42e5-adba-f7732570a49f",
  externalLink: "https://musicbrainz.org/work/d4333f22-db44-42e5-adba-f7732570a49f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
