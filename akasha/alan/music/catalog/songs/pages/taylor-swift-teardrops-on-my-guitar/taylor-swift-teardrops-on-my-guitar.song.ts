import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTeardropsOnMyGuitar = {
  id: "019ea416-3c16-7a6c-b6c7-9ad3a1890251",
  pageTypeSlug: "song",
  slug: "taylor-swift-teardrops-on-my-guitar",
  title: "Teardrops on My Guitar",
  artistSlug: "taylor-swift",
  externalId: "bcffb49d-9d17-43aa-9e0d-88ce7dc4ebfb",
  externalLink: "https://musicbrainz.org/work/bcffb49d-9d17-43aa-9e0d-88ce7dc4ebfb",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
