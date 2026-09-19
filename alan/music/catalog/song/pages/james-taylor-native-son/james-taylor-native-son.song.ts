import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorNativeSon = {
  id: "01a0b72f-3572-777a-9186-37d77f0b2555",
  type: "page-type/song",
  slug: "james-taylor-native-son",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3a182ae3-dd3a-38f1-964b-786fd33661ea",
      externalLink: "https://musicbrainz.org/work/3a182ae3-dd3a-38f1-964b-786fd33661ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Native Son",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
