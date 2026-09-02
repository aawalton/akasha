import type { Song } from "../../song.page-type.ts"

export const taylorSwiftBetty = {
  id: "019ea416-1006-7074-92a5-61fca3cb4422",
  pageTypeSlug: "song",
  slug: "taylor-swift-betty",
  title: "betty",
  artistSlug: "taylor-swift",
  externalId: "9f24824b-1777-45e1-a829-bba8f0ca5b27",
  externalLink: "https://musicbrainz.org/work/9f24824b-1777-45e1-a829-bba8f0ca5b27",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
