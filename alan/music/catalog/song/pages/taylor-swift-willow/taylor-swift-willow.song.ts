import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWillow = {
  id: "019ea416-4b0f-7956-b133-4e311e9579f6",
  type: "song",
  slug: "taylor-swift-willow",
  title: "willow",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4333f22-db44-42e5-adba-f7732570a49f",
      externalLink: "https://musicbrainz.org/work/d4333f22-db44-42e5-adba-f7732570a49f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
