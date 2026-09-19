import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTornadoWarnings = {
  id: "01a0b723-d4ce-75c0-9268-312cd3ca027c",
  type: "page-type/song",
  slug: "sabrina-carpenter-tornado-warnings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "69a655ef-b2a6-4120-814f-19359434a273",
      externalLink: "https://musicbrainz.org/work/69a655ef-b2a6-4120-814f-19359434a273",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tornado Warnings",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
