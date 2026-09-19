import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftPaperRings = {
  id: "019ea416-341d-7fcf-99d5-b4ff53af99ee",
  type: "page-type/song",
  slug: "taylor-swift-paper-rings",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "58a1bf9f-daba-4d4b-a419-a0d347f16134",
      externalLink: "https://musicbrainz.org/work/58a1bf9f-daba-4d4b-a419-a0d347f16134",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paper Rings",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
