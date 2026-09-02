import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDearJohn = {
  id: "019ea416-153d-7de7-a36d-3af8b7731b6e",
  pageTypeSlug: "song",
  slug: "taylor-swift-dear-john",
  title: "Dear John",
  artistSlug: "taylor-swift",
  externalId: "c70e6295-12ed-39ca-b069-cd485920ac11",
  externalLink: "https://musicbrainz.org/work/c70e6295-12ed-39ca-b069-cd485920ac11",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
