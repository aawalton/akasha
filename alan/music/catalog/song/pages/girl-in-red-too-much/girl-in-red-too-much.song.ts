import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedTooMuch = {
  id: "01a0b724-d484-7ecb-aa74-8fa9db1ce79f",
  type: "page-type/song",
  slug: "girl-in-red-too-much",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5ae60f6-5072-429c-bb40-88419eb5a6c7",
      externalLink: "https://musicbrainz.org/work/b5ae60f6-5072-429c-bb40-88419eb5a6c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Too Much",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:50:39.364Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
