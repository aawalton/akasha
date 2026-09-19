import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHowDidItEnd = {
  id: "019ea416-1eae-7625-b338-8229760b14f0",
  type: "page-type/song",
  slug: "taylor-swift-how-did-it-end",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5404e826-c046-480a-b3e5-8cbeb8407560",
      externalLink: "https://musicbrainz.org/work/5404e826-c046-480a-b3e5-8cbeb8407560",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "How Did It End?",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
