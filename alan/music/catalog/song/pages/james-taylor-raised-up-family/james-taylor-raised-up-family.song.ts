import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorRaisedUpFamily = {
  id: "01a0b72f-34b4-77fc-91cb-7820cde2c429",
  type: "page-type/song",
  slug: "james-taylor-raised-up-family",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "29629a19-09c0-4999-ac70-3e35e13e22e9",
      externalLink: "https://musicbrainz.org/work/29629a19-09c0-4999-ac70-3e35e13e22e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Raised Up Family",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
