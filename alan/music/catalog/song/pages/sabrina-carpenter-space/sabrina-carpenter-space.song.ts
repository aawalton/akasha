import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSpace = {
  id: "01a0b723-dab1-7825-b0fe-8602f38092a6",
  type: "page-type/song",
  slug: "sabrina-carpenter-space",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fc36cc78-b932-4a38-9800-7652197cf0f6",
      externalLink: "https://musicbrainz.org/work/fc36cc78-b932-4a38-9800-7652197cf0f6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Space",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
