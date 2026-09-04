import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTimeless = {
  id: "019ea416-47de-7d35-8ae7-9bf40ac2a930",
  pageTypeSlug: "song",
  slug: "taylor-swift-timeless",
  title: "Timeless",
  artistSlug: "taylor-swift",
  externalId: "8c9c83ce-f4f6-4801-b1dd-0de000a2cfee",
  externalLink: "https://musicbrainz.org/work/8c9c83ce-f4f6-4801-b1dd-0de000a2cfee",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
