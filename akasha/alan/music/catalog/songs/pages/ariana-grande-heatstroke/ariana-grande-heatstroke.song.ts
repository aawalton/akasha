import type { Song } from "../../song.page-type.ts"

export const arianaGrandeHeatstroke = {
  id: "019ea4e1-4af2-7943-9649-8546b6d0a811",
  pageTypeSlug: "song",
  slug: "ariana-grande-heatstroke",
  title: "Heatstroke",
  artistSlug: "ariana-grande",
  externalId: "4c0a1e33-748c-4ba1-bdfe-135632719a99",
  externalLink: "https://musicbrainz.org/work/4c0a1e33-748c-4ba1-bdfe-135632719a99",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
