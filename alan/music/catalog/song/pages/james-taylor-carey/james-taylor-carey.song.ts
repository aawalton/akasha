import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCarey = {
  id: "01a0b72f-2ac4-76af-860d-ff357f446fd4",
  type: "page-type/song",
  slug: "james-taylor-carey",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8be6adb-63a6-3db9-9c71-26dfd4c5ebb9",
      externalLink: "https://musicbrainz.org/work/a8be6adb-63a6-3db9-9c71-26dfd4c5ebb9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carey",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
