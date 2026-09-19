import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayLost = {
  id: "01a0ba5d-4fd9-7046-b252-c5c3496fd29c",
  type: "page-type/song",
  slug: "coldplay-lost",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b0f1404c-348b-3ab8-b54b-159106db4209",
      externalLink: "https://musicbrainz.org/work/b0f1404c-348b-3ab8-b54b-159106db4209",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lost+",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
