import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorChange = {
  id: "01a0b72f-2fea-7fa4-9808-385f2aa73882",
  type: "page-type/song",
  slug: "james-taylor-change",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ddf43984-ec64-4b0d-9867-ce82f4af7d78",
      externalLink: "https://musicbrainz.org/work/ddf43984-ec64-4b0d-9867-ce82f4af7d78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Change",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
