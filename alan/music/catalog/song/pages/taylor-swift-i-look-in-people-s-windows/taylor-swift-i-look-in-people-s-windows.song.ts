import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftILookInPeopleSWindows = {
  id: "019ea416-22a8-7e2d-b5ec-4439c5b14303",
  type: "page-type/song",
  slug: "taylor-swift-i-look-in-people-s-windows",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8405866a-72bd-48a7-89e6-3e9587e157d8",
      externalLink: "https://musicbrainz.org/work/8405866a-72bd-48a7-89e6-3e9587e157d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Look in People’s Windows",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
