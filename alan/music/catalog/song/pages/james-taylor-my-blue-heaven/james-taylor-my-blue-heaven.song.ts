import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMyBlueHeaven = {
  id: "01a0b72f-3f4b-7d05-a17d-4ac829c849dc",
  type: "page-type/song",
  slug: "james-taylor-my-blue-heaven",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b9bf6339-7dac-3c15-a7e3-2fc9fcd9326d",
      externalLink: "https://musicbrainz.org/work/b9bf6339-7dac-3c15-a7e3-2fc9fcd9326d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Blue Heaven",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
