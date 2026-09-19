import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterCouldntMakeItAnyHarder = {
  id: "01a0b723-cce6-70b9-a5d1-8ff82fed0bd6",
  type: "page-type/song",
  slug: "sabrina-carpenter-couldnt-make-it-any-harder",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c45c226b-24f1-4ff6-8e72-aacb499c99f8",
      externalLink: "https://musicbrainz.org/work/c45c226b-24f1-4ff6-8e72-aacb499c99f8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Couldn't Make It Any Harder",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
