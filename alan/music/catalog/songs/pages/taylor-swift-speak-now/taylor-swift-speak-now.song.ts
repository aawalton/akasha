import type { Song } from "../../song.page-type.ts"

export const taylorSwiftSpeakNow = {
  id: "019ea416-4251-787c-b28f-883484901cb6",
  pageTypeSlug: "song",
  slug: "taylor-swift-speak-now",
  title: "Speak Now",
  artistSlug: "taylor-swift",
  externalId: "ff0bc1b4-ba5e-3a4f-8447-17da5cb7c722",
  externalLink: "https://musicbrainz.org/work/ff0bc1b4-ba5e-3a4f-8447-17da5cb7c722",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
