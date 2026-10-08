import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDress = {
  id: "019ea416-0e2c-7061-812b-7f6d8a0d72fc",
  type: "page-type/song",
  slug: "taylor-swift-dress",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "93f308df-6621-4166-9318-0078f9182d47",
      externalLink: "https://musicbrainz.org/work/93f308df-6621-4166-9318-0078f9182d47",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dress",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:09.388Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
