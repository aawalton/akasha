import type { Song } from "../../song.page-type.ts"

export const mitskiPearlDiver = {
  id: "019f0ea2-f868-7ccf-9336-0a96e0e10d46",
  pageTypeSlug: "song",
  slug: "mitski-pearl-diver",
  title: "Pearl Diver",
  artistSlug: "mitski",
  externalId: "859ed6dd-bb64-4adc-8387-53fb9ad9df0d",
  externalLink: "https://musicbrainz.org/work/859ed6dd-bb64-4adc-8387-53fb9ad9df0d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
