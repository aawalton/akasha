import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftActuallyRomantic = {
  id: "019ea416-0abe-77e3-99b3-367dc4845257",
  type: "page-type/song",
  slug: "taylor-swift-actually-romantic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6d1c1dec-975b-4631-89a1-cbd9c0a564b5",
      externalLink: "https://musicbrainz.org/work/6d1c1dec-975b-4631-89a1-cbd9c0a564b5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Actually Romantic",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
