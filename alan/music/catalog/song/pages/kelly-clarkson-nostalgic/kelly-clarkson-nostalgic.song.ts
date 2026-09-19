import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonNostalgic = {
  id: "019ea4af-f683-7bd3-9913-4b224feaf477",
  type: "page-type/song",
  slug: "kelly-clarkson-nostalgic",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c5fdac11-3af8-4b94-b9c7-b2f0ce3764e1",
      externalLink: "https://musicbrainz.org/work/c5fdac11-3af8-4b94-b9c7-b2f0ce3764e1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Nostalgic",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
