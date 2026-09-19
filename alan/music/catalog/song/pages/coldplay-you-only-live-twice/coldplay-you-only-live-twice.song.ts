import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayYouOnlyLiveTwice = {
  id: "01a0ba61-0091-7f94-ab02-14a81a0082ea",
  type: "page-type/song",
  slug: "coldplay-you-only-live-twice",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1f850e5-f1c3-3b7d-ae6f-9cd1297c21c7",
      externalLink: "https://musicbrainz.org/work/e1f850e5-f1c3-3b7d-ae6f-9cd1297c21c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Only Live Twice",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
