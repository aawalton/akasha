import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIDidSomethingBad = {
  id: "019ea416-2ac0-7b2a-b930-c5bd91375d90",
  type: "page-type/song",
  slug: "taylor-swift-i-did-something-bad",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d878513a-c694-4d5c-8771-f3bf55f836ae",
      externalLink: "https://musicbrainz.org/work/d878513a-c694-4d5c-8771-f3bf55f836ae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Did Something Bad",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:16.704Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
