import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterParis = {
  id: "01a0b723-c335-74a5-8ce1-0d07a74f624b",
  type: "page-type/song",
  slug: "sabrina-carpenter-paris",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "346caccf-72d1-40d0-9de1-cdd296b3a0a2",
      externalLink: "https://musicbrainz.org/work/346caccf-72d1-40d0-9de1-cdd296b3a0a2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paris",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
