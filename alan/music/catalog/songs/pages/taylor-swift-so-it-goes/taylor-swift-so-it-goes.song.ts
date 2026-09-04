import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSoItGoes = {
  id: "019ea416-2ee6-7aae-9a43-6400034989e2",
  pageTypeSlug: "song",
  slug: "taylor-swift-so-it-goes",
  title: "So It Goes…",
  artistSlug: "taylor-swift",
  externalId: "0fa1c672-5d8f-4b56-b304-a76c7ffb2525",
  externalLink: "https://musicbrainz.org/work/0fa1c672-5d8f-4b56-b304-a76c7ffb2525",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
