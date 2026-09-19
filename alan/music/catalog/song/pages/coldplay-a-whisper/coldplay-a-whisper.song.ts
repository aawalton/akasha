import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAWhisper = {
  id: "01a0ba5d-38bb-71c8-aaad-fbdf6ceb86b0",
  type: "page-type/song",
  slug: "coldplay-a-whisper",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0fcd9393-6ed7-3cd1-bf4f-f325e9cbf6cd",
      externalLink: "https://musicbrainz.org/work/0fcd9393-6ed7-3cd1-bf4f-f325e9cbf6cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Whisper",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
