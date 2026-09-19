import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTimeless = {
  id: "019ea416-47de-7d35-8ae7-9bf40ac2a930",
  type: "page-type/song",
  slug: "taylor-swift-timeless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8c9c83ce-f4f6-4801-b1dd-0de000a2cfee",
      externalLink: "https://musicbrainz.org/work/8c9c83ce-f4f6-4801-b1dd-0de000a2cfee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Timeless",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
