import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftInvisibleString = {
  id: "019ea416-2c96-701c-ae56-f9e5ea559010",
  type: "page-type/song",
  slug: "taylor-swift-invisible-string",
  rank: "A+",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f72c870e-904c-4b5f-92b5-360fcfd6b2fe",
      externalLink: "https://musicbrainz.org/work/f72c870e-904c-4b5f-92b5-360fcfd6b2fe",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "invisible string",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
