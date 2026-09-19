import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUntitled5 = {
  id: "01a0ba61-00c9-7f8d-9dc6-65dc826e6113",
  type: "page-type/song",
  slug: "coldplay-untitled-5",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e475080a-3827-4711-adad-e858c5aff142",
      externalLink: "https://musicbrainz.org/work/e475080a-3827-4711-adad-e858c5aff142",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "بنی آدم",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
