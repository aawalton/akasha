import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOneManParade = {
  id: "01a0b72f-345e-7777-b6dd-cf7a6d40d463",
  type: "page-type/song",
  slug: "james-taylor-one-man-parade",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "28540d49-3903-4323-81cc-8e5f3c35e8be",
      externalLink: "https://musicbrainz.org/work/28540d49-3903-4323-81cc-8e5f3c35e8be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Man Parade",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
