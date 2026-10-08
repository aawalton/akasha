import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeRightThere = {
  id: "019ea4e6-97bf-7a31-b691-67e98da7cde2",
  type: "page-type/song",
  slug: "ariana-grande-right-there",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9b41bb33-53a1-42f2-8bb2-b4692b4d1a21",
      externalLink: "https://musicbrainz.org/work/9b41bb33-53a1-42f2-8bb2-b4692b4d1a21",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Right There",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:43:56.095Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
