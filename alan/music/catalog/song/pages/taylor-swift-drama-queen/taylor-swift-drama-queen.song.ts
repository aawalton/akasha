import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDramaQueen = {
  id: "019ea416-0ec8-73a6-b603-df45762a96ac",
  type: "page-type/song",
  slug: "taylor-swift-drama-queen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9749c2f9-52b8-4fa4-ad4e-37d599abb9f1",
      externalLink: "https://musicbrainz.org/work/9749c2f9-52b8-4fa4-ad4e-37d599abb9f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Drama Queen",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.544Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
