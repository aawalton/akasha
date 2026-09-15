import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftDownBad = {
  id: "019ea416-0978-7cfc-b018-8250e7524a3f",
  type: "page-type/song",
  slug: "taylor-swift-down-bad",
  title: "Down Bad",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5aa09a7a-931a-49d1-904b-cccded07c524",
      externalLink: "https://musicbrainz.org/work/5aa09a7a-931a-49d1-904b-cccded07c524",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
