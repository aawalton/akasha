import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStopTrying = {
  id: "019ea4cd-2d94-73e2-90f1-4dd912a37742",
  type: "page-type/song",
  slug: "sia-stop-trying",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f2364cd-a9ef-4045-a936-5aaa763ba29e",
      externalLink: "https://musicbrainz.org/work/8f2364cd-a9ef-4045-a936-5aaa763ba29e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Stop Trying",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
