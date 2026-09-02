import type { Song } from "../../song.page-type.ts"

export const taylorSwiftEpiphany = {
  id: "019ea416-1641-750d-a37d-9ffb93c91469",
  pageTypeSlug: "song",
  slug: "taylor-swift-epiphany",
  title: "epiphany",
  artistSlug: "taylor-swift",
  externalId: "d6e78894-95a1-4c8d-ab2a-1fc2d67473f7",
  externalLink: "https://musicbrainz.org/work/d6e78894-95a1-4c8d-ab2a-1fc2d67473f7",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
