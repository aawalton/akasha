import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterBadReviews = {
  id: "01a0b723-bf55-7f50-bc5c-9eab05594966",
  type: "page-type/song",
  slug: "sabrina-carpenter-bad-reviews",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "00b5220a-b57a-4c04-b763-adedc496d6a3",
      externalLink: "https://musicbrainz.org/work/00b5220a-b57a-4c04-b763-adedc496d6a3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad Reviews",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
