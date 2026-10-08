import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishListenBeforeIGo = {
  id: "019ea4a8-718b-74ea-8403-90a0d7925279",
  type: "page-type/song",
  slug: "billie-eilish-listen-before-i-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "136522e5-ba6c-4350-9202-f564976a43d1",
      externalLink: "https://musicbrainz.org/work/136522e5-ba6c-4350-9202-f564976a43d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "listen before i go",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T00:36:03.083Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
