import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterPleasePleasePlease = {
  id: "01a0b723-cf4a-74c3-9d95-74289c6c2db1",
  type: "page-type/song",
  slug: "sabrina-carpenter-please-please-please",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f39cdac8-4f6e-40ef-8cd0-8a6b0d526ff7",
      externalLink: "https://musicbrainz.org/work/f39cdac8-4f6e-40ef-8cd0-8a6b0d526ff7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Please Please Please",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
