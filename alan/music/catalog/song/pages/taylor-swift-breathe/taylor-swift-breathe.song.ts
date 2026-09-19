import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftBreathe = {
  id: "019ea416-0945-7c15-a995-d227ab5750aa",
  type: "page-type/song",
  slug: "taylor-swift-breathe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "55e776e0-2d67-3c6c-b088-ee091ac63f5f",
      externalLink: "https://musicbrainz.org/work/55e776e0-2d67-3c6c-b088-ee091ac63f5f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Breathe",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
