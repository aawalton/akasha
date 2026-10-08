import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeIMNotThatGirl = {
  id: "019ea4e0-c684-7c37-a182-c180959a3b6e",
  type: "page-type/song",
  slug: "ariana-grande-i-m-not-that-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "25be2832-2a15-4a21-80e6-09384a56fc79",
      externalLink: "https://musicbrainz.org/work/25be2832-2a15-4a21-80e6-09384a56fc79",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I'm Not That Girl",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:37:34.852Z",
  updatedAt: "2026-09-19T16:44:14.000Z",
} as const satisfies Song
