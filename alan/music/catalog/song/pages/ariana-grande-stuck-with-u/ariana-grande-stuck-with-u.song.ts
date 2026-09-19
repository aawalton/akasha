import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeStuckWithU = {
  id: "019ea4e6-ecb2-7957-9e50-2028992b3348",
  type: "page-type/song",
  slug: "ariana-grande-stuck-with-u",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a29bb527-d829-4d0c-8901-f7dbad28325d",
      externalLink: "https://musicbrainz.org/work/a29bb527-d829-4d0c-8901-f7dbad28325d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stuck with U",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
