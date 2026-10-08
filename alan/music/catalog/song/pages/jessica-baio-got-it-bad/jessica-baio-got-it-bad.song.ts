import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioGotItBad = {
  id: "019ea4f7-9835-7715-8fa3-76311045955d",
  type: "page-type/song",
  slug: "jessica-baio-got-it-bad",
  title: "got it bad",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ca262762-7dc1-4950-b122-809464645051",
      externalLink: "https://musicbrainz.org/recording/ca262762-7dc1-4950-b122-809464645051",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T02:02:30.325Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
