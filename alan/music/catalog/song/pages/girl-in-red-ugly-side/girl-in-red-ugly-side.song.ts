import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedUglySide = {
  id: "01a0b724-d1e5-7531-b391-04a437c85a08",
  type: "page-type/song",
  slug: "girl-in-red-ugly-side",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38f7e10b-ce91-4696-bd64-9c555dd76abb",
      externalLink: "https://musicbrainz.org/work/38f7e10b-ce91-4696-bd64-9c555dd76abb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ugly Side",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
