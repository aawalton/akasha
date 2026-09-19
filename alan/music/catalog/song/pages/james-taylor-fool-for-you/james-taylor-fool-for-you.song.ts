import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFoolForYou = {
  id: "01a0b72f-21f6-70dd-9364-06e10a2dd17e",
  type: "page-type/song",
  slug: "james-taylor-fool-for-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26144e1e-de5a-4caa-b803-9fa06c542c14",
      externalLink: "https://musicbrainz.org/work/26144e1e-de5a-4caa-b803-9fa06c542c14",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fool for You",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
