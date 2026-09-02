import type { Song } from "../../song.page-type.ts"

export const mitskiLiquidSmooth = {
  id: "019f0ea1-3e2c-78d0-a8c4-052aa9172e20",
  pageTypeSlug: "song",
  slug: "mitski-liquid-smooth",
  title: "Liquid Smooth",
  artistSlug: "mitski",
  externalId: "6321829c-17b8-440c-90d2-0b0dc37afcc0",
  externalLink: "https://musicbrainz.org/work/6321829c-17b8-440c-90d2-0b0dc37afcc0",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
