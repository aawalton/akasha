import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMine = {
  id: "019ea416-3154-7ea4-8f6a-ba23b6e9442c",
  type: "page-type/song",
  slug: "taylor-swift-mine",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3b86f1da-4c28-3da1-8f90-632e62e7b521",
      externalLink: "https://musicbrainz.org/work/3b86f1da-4c28-3da1-8f90-632e62e7b521",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mine",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.388Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
