import type { Song } from "../../song.page-type.ts"

export const taylorSwiftCassandra = {
  id: "019ea416-0517-7818-8f3c-d402efdede1b",
  pageTypeSlug: "song",
  slug: "taylor-swift-cassandra",
  title: "Cassandra",
  artistSlug: "taylor-swift",
  externalId: "2b82c0fb-4cd0-441f-8619-0684f12031fd",
  externalLink: "https://musicbrainz.org/work/2b82c0fb-4cd0-441f-8619-0684f12031fd",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
