import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterItsFinallyChristmas = {
  id: "01a0b723-cb2e-77b2-b9ca-e95cdc2dbe45",
  type: "page-type/song",
  slug: "sabrina-carpenter-its-finally-christmas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a7bdf838-78bf-48ff-a253-7405feacbcff",
      externalLink: "https://musicbrainz.org/work/a7bdf838-78bf-48ff-a253-7405feacbcff",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It's Finally Christmas",
  artist: "artist/sabrina-carpenter",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
