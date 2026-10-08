import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFalseGod = {
  id: "019ea416-255a-78b7-8db2-c4c0c34bd4b7",
  type: "page-type/song",
  slug: "taylor-swift-false-god",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9c8e847b-ef1e-4b7e-a028-8c6db7802ac6",
      externalLink: "https://musicbrainz.org/work/9c8e847b-ef1e-4b7e-a028-8c6db7802ac6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "False God",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:15.322Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
