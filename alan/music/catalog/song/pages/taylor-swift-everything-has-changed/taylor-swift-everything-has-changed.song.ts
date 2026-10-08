import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftEverythingHasChanged = {
  id: "019ea416-0dc5-7e34-9ff8-607b5b2d9a23",
  type: "page-type/song",
  slug: "taylor-swift-everything-has-changed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8c58a94d-989a-4264-9941-6a792bf871b4",
      externalLink: "https://musicbrainz.org/work/8c58a94d-989a-4264-9941-6a792bf871b4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Everything Has Changed",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.285Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
