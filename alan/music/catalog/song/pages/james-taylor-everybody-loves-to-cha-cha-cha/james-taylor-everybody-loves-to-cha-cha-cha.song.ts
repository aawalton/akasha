import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorEverybodyLovesToChaChaCha = {
  id: "01a0b72f-2e64-7218-aa72-fa0bdca1cfc1",
  type: "page-type/song",
  slug: "james-taylor-everybody-loves-to-cha-cha-cha",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c4a6e5ad-8c59-378e-aa2e-af6a7bcd5b49",
      externalLink: "https://musicbrainz.org/work/c4a6e5ad-8c59-378e-aa2e-af6a7bcd5b49",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everybody Loves to Cha‐Cha‐Cha",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
