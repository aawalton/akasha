import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooUntitled = {
  id: "01a0b724-3915-7fa2-a62d-15bf99e1f05e",
  type: "page-type/song",
  slug: "jisoo-untitled",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c8d150cc-fd9a-4a2a-aadf-640119691b1c",
      externalLink: "https://musicbrainz.org/work/c8d150cc-fd9a-4a2a-aadf-640119691b1c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "雪の華",
  artist: "artist/jisoo",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
