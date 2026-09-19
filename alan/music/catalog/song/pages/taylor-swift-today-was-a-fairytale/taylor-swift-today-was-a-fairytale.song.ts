import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTodayWasAFairytale = {
  id: "019ea416-465c-788e-9537-49c9b08d5936",
  type: "page-type/song",
  slug: "taylor-swift-today-was-a-fairytale",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5f87e828-73a8-4bf7-8d26-592a1403f876",
      externalLink: "https://musicbrainz.org/work/5f87e828-73a8-4bf7-8d26-592a1403f876",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Today Was a Fairytale",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
