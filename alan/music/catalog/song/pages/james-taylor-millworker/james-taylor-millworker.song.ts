import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMillworker = {
  id: "01a0b72f-3de4-76a6-ac23-fbb1e8d07cf7",
  type: "page-type/song",
  slug: "james-taylor-millworker",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b12ea1dd-cb0c-411d-98e0-1ff53256f6ab",
      externalLink: "https://musicbrainz.org/work/b12ea1dd-cb0c-411d-98e0-1ff53256f6ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Millworker",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T01:02:01.700Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
