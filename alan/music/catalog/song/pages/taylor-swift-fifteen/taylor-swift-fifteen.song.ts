import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftFifteen = {
  id: "019ea416-2086-785a-b2d3-6fbfbda170fb",
  type: "page-type/song",
  slug: "taylor-swift-fifteen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6cad3efd-e9f4-3dcd-9b71-fc25b630382b",
      externalLink: "https://musicbrainz.org/work/6cad3efd-e9f4-3dcd-9b71-fc25b630382b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fifteen",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
