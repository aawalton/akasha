import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterGoodLuckBabe = {
  id: "01a0b723-bec5-7a8a-b6b5-dbe2ef3c3145",
  type: "page-type/song",
  slug: "sabrina-carpenter-good-luck-babe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "000e726b-3163-451c-88a1-5183b468e47e",
      externalLink: "https://musicbrainz.org/work/000e726b-3163-451c-88a1-5183b468e47e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Good Luck, Babe!",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
