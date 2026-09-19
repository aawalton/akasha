import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanMayItBe = {
  id: "01a0b720-10d8-7084-a6ba-bfcad84c671a",
  type: "page-type/song",
  slug: "celtic-woman-may-it-be",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "92629c6c-c5d3-3b5d-9c6f-20b5ca4a7efc",
      externalLink: "https://musicbrainz.org/work/92629c6c-c5d3-3b5d-9c6f-20b5ca4a7efc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "May It Be",
  artist: "artist/celtic-woman",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
