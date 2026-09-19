import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUsAgainstTheWorld = {
  id: "01a0ba5d-4fa0-7b58-a4a6-85697e07a1a1",
  type: "page-type/song",
  slug: "coldplay-us-against-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4ea9c790-b6fd-405c-8242-817bf6d002e9",
      externalLink: "https://musicbrainz.org/work/4ea9c790-b6fd-405c-8242-817bf6d002e9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Us Against the World",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
