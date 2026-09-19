import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayOneWorld = {
  id: "01a0ba60-f5ba-7d24-8e40-657a776a714e",
  type: "page-type/song",
  slug: "coldplay-one-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c29ed08-bbc0-4b84-b5de-972074524065",
      externalLink: "https://musicbrainz.org/work/9c29ed08-bbc0-4b84-b5de-972074524065",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ONE WORLD",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
