import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySpies = {
  id: "01a0ba5d-4b77-70ed-b56c-93936c7be26d",
  type: "page-type/song",
  slug: "coldplay-spies",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0943ee45-75e1-36ce-86e7-ac526faad50c",
      externalLink: "https://musicbrainz.org/work/0943ee45-75e1-36ce-86e7-ac526faad50c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Spies",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
