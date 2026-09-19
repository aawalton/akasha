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
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
