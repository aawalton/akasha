import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSafetyNet = {
  id: "019ea4e6-bc1a-73b2-9bf4-f9a93fe33247",
  type: "page-type/song",
  slug: "ariana-grande-safety-net",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9fd87837-c788-4f15-931e-870fcfff4d23",
      externalLink: "https://musicbrainz.org/work/9fd87837-c788-4f15-931e-870fcfff4d23",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "safety net",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
