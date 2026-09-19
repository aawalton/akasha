import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGorilla = {
  id: "01a0b72f-274a-7e18-a0c3-eab345ce3af2",
  type: "page-type/song",
  slug: "james-taylor-gorilla",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71dc5049-3837-4910-8c7e-95facdef269e",
      externalLink: "https://musicbrainz.org/work/71dc5049-3837-4910-8c7e-95facdef269e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Gorilla",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
