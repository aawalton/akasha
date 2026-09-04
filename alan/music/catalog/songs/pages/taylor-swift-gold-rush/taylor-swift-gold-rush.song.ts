import type { Song } from "../../song.page-type.ts"

export const taylorSwiftGoldRush = {
  id: "019ea416-1a34-7263-a338-b5c3776d5710",
  pageTypeSlug: "song",
  slug: "taylor-swift-gold-rush",
  title: "gold rush",
  artistSlug: "taylor-swift",
  externalId: "16f2770d-e18e-4911-9920-437994ea807e",
  externalLink: "https://musicbrainz.org/work/16f2770d-e18e-4911-9920-437994ea807e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
