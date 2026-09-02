import type { Song } from "../../song.page-type.ts"

export const mitskiCopCar = {
  id: "019f0ea7-a808-7649-9fb7-3f9ca43fe2f5",
  pageTypeSlug: "song",
  slug: "mitski-cop-car",
  title: "Cop Car",
  artistSlug: "mitski",
  externalId: "e3ad9a52-ec65-403d-89ce-f92066a91cb9",
  externalLink: "https://musicbrainz.org/work/e3ad9a52-ec65-403d-89ce-f92066a91cb9",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
