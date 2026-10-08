import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWeWereHappy = {
  id: "019ea416-475d-7259-99e7-9dab7f73769d",
  type: "page-type/song",
  slug: "taylor-swift-we-were-happy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "899e2daf-b467-4196-b645-c0ffcc157edb",
      externalLink: "https://musicbrainz.org/work/899e2daf-b467-4196-b645-c0ffcc157edb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Were Happy",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:24.029Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
