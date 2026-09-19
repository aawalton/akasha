import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeGetHappyHappyDaysAreHereAgain = {
  id: "019ea4e0-6809-7057-9799-8b337319b116",
  type: "page-type/song",
  slug: "ariana-grande-get-happy-happy-days-are-here-again",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0add257a-b0cf-3421-8a28-8147a1eb3be5",
      externalLink: "https://musicbrainz.org/work/0add257a-b0cf-3421-8a28-8147a1eb3be5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Get Happy / Happy Days Are Here Again",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
