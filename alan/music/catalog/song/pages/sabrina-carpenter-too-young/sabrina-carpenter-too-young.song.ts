import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTooYoung = {
  id: "01a0b723-d57b-7298-ba80-75eeac4e2ff5",
  type: "page-type/song",
  slug: "sabrina-carpenter-too-young",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8624c40a-88cd-4c28-9a13-594d56a92c6d",
      externalLink: "https://musicbrainz.org/work/8624c40a-88cd-4c28-9a13-594d56a92c6d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Too Young",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
