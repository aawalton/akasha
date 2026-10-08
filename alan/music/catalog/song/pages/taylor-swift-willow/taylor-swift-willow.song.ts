import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWillow = {
  id: "019ea416-4b0f-7956-b133-4e311e9579f6",
  type: "page-type/song",
  slug: "taylor-swift-willow",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d4333f22-db44-42e5-adba-f7732570a49f",
      externalLink: "https://musicbrainz.org/work/d4333f22-db44-42e5-adba-f7732570a49f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "willow",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:24.975Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
