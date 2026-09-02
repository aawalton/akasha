import type { Song } from "../../song.page-type.ts"

export const taylorSwiftShakeItOff = {
  id: "019ea416-3564-7a0c-93c0-8d74d5703c1a",
  pageTypeSlug: "song",
  slug: "taylor-swift-shake-it-off",
  title: "Shake It Off",
  artistSlug: "taylor-swift",
  externalId: "5fa63cad-ca5d-4927-ad27-459388bdebaf",
  externalLink: "https://musicbrainz.org/work/5fa63cad-ca5d-4927-ad27-459388bdebaf",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
