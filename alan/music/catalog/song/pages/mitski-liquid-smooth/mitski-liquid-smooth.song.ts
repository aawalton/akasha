import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLiquidSmooth = {
  id: "019f0ea1-3e2c-78d0-a8c4-052aa9172e20",
  type: "page-type/song",
  slug: "mitski-liquid-smooth",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6321829c-17b8-440c-90d2-0b0dc37afcc0",
      externalLink: "https://musicbrainz.org/work/6321829c-17b8-440c-90d2-0b0dc37afcc0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Liquid Smooth",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
