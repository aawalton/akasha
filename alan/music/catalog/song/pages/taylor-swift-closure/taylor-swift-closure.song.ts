import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftClosure = {
  id: "019ea416-129c-73af-88c6-b9cde0bcb2ec",
  type: "page-type/song",
  slug: "taylor-swift-closure",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b3b693f8-7db7-4852-bc68-4e965083e0c5",
      externalLink: "https://musicbrainz.org/work/b3b693f8-7db7-4852-bc68-4e965083e0c5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "closure",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
