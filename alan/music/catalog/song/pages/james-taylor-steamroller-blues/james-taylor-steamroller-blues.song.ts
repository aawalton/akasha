import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSteamrollerBlues = {
  id: "01a0b72f-4dce-7c92-936f-6be6667ec536",
  type: "page-type/song",
  slug: "james-taylor-steamroller-blues",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "72d76791-4fdf-307c-a037-5d7ba17e4b79",
      externalLink: "https://musicbrainz.org/work/72d76791-4fdf-307c-a037-5d7ba17e4b79",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Steamroller Blues",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
