import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeHeatstroke = {
  id: "019ea4e1-4af2-7943-9649-8546b6d0a811",
  type: "page-type/song",
  slug: "ariana-grande-heatstroke",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c0a1e33-748c-4ba1-bdfe-135632719a99",
      externalLink: "https://musicbrainz.org/work/4c0a1e33-748c-4ba1-bdfe-135632719a99",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Heatstroke",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
