import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayArabesque = {
  id: "01a0ba5d-3997-76cb-b3cc-1042edc71595",
  type: "page-type/song",
  slug: "coldplay-arabesque",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1662f321-c83f-4f75-a9da-080adf63e59e",
      externalLink: "https://musicbrainz.org/work/1662f321-c83f-4f75-a9da-080adf63e59e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Arabesque",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
