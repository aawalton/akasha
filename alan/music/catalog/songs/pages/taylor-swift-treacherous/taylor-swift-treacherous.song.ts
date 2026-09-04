import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTreacherous = {
  id: "019ea416-4a75-7b7b-9414-7d996ffd374f",
  pageTypeSlug: "song",
  slug: "taylor-swift-treacherous",
  title: "Treacherous",
  artistSlug: "taylor-swift",
  externalId: "c26a7f69-b83e-45a5-9d51-0b64cbcf1e95",
  externalLink: "https://musicbrainz.org/work/c26a7f69-b83e-45a5-9d51-0b64cbcf1e95",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
