import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRobin = {
  id: "019ea416-3b12-752b-92e1-b2b6083e0ebd",
  type: "page-type/song",
  slug: "taylor-swift-robin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b37a420f-876e-498f-aa2b-7f846695f407",
      externalLink: "https://musicbrainz.org/work/b37a420f-876e-498f-aa2b-7f846695f407",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Robin",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:20.882Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
