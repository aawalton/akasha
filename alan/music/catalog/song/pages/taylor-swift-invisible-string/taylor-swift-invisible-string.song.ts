import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftInvisibleString = {
  id: "019ea416-2c96-701c-ae56-f9e5ea559010",
  type: "page-type/song",
  slug: "taylor-swift-invisible-string",
  title: "invisible string",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f72c870e-904c-4b5f-92b5-360fcfd6b2fe",
      externalLink: "https://musicbrainz.org/work/f72c870e-904c-4b5f-92b5-360fcfd6b2fe",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "A+",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
