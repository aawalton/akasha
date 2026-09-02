import type { Song } from "../../song.page-type.ts"

export const taylorSwiftDearReader = {
  id: "019ea416-0f9b-79ae-adca-02e0b0dcf2e8",
  pageTypeSlug: "song",
  slug: "taylor-swift-dear-reader",
  title: "Dear Reader",
  artistSlug: "taylor-swift",
  externalId: "9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
  externalLink: "https://musicbrainz.org/work/9dacca75-7c61-4ff8-ba9e-8ce29e10ab0f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
