import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorEveryday = {
  id: "01a0b72f-2558-780e-83dd-af84a63872e4",
  type: "page-type/song",
  slug: "james-taylor-everyday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5a224e20-1846-3de0-bfea-75fc8d74a588",
      externalLink: "https://musicbrainz.org/work/5a224e20-1846-3de0-bfea-75fc8d74a588",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everyday",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
