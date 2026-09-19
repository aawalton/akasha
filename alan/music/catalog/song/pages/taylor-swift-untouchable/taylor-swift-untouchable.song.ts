import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftUntouchable = {
  id: "019ea416-4539-7453-aa28-8262598be289",
  type: "page-type/song",
  slug: "taylor-swift-untouchable",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4c3d3a79-7930-4586-a85f-cabe706e8c67",
      externalLink: "https://musicbrainz.org/work/4c3d3a79-7930-4586-a85f-cabe706e8c67",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Untouchable",
  artist: "artist/taylor-swift",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
