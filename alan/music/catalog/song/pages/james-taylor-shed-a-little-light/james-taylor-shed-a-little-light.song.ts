import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorShedALittleLight = {
  id: "01a0b72f-4628-7c32-8442-fda0f68cc133",
  type: "page-type/song",
  slug: "james-taylor-shed-a-little-light",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0531de34-d16f-415d-9874-5cc808185afc",
      externalLink: "https://musicbrainz.org/work/0531de34-d16f-415d-9874-5cc808185afc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shed a Little Light",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
