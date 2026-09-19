import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWhenEmmaFallsInLove = {
  id: "019ea416-4972-7ee5-a6c6-6968a5020118",
  type: "page-type/song",
  slug: "taylor-swift-when-emma-falls-in-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "abf6edf1-8f4a-4e8c-8bb8-29dea7a9b0f5",
      externalLink: "https://musicbrainz.org/work/abf6edf1-8f4a-4e8c-8bb8-29dea7a9b0f5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "When Emma Falls in Love",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
