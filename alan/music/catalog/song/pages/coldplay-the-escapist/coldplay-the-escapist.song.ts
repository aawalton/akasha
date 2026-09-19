import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheEscapist = {
  id: "01a0ba5d-5393-7fa8-b0f7-695ccd602da5",
  type: "page-type/song",
  slug: "coldplay-the-escapist",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "84e34579-6759-4600-86d5-f9ed5756a8c6",
      externalLink: "https://musicbrainz.org/work/84e34579-6759-4600-86d5-f9ed5756a8c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Escapist",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
