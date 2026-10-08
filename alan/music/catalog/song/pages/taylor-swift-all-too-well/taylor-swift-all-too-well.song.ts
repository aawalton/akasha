import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftAllTooWell = {
  id: "019ea416-04da-7a02-9f6f-a41d50337755",
  type: "page-type/song",
  slug: "taylor-swift-all-too-well",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2a7ec633-1bdc-4d08-b75b-e462c3ee4a20",
      externalLink: "https://musicbrainz.org/work/2a7ec633-1bdc-4d08-b75b-e462c3ee4a20",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All Too Well",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:07.002Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
