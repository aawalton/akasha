import type { Song } from "../../song.page-type.ts"

export const taylorSwiftEvermore = {
  id: "019ea416-0555-7b7a-ac17-0202e8b1e550",
  pageTypeSlug: "song",
  slug: "taylor-swift-evermore",
  title: "evermore",
  artistSlug: "taylor-swift",
  externalId: "33d0bc78-0ee7-4d6a-ae12-7747e45caa54",
  externalLink: "https://musicbrainz.org/work/33d0bc78-0ee7-4d6a-ae12-7747e45caa54",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
