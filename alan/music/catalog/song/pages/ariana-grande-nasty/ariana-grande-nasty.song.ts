import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNasty = {
  id: "019ea4e8-a83f-7dc2-b1b8-93e814686b6d",
  type: "page-type/song",
  slug: "ariana-grande-nasty",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fe5aaf8c-2197-49e8-be92-721383a9b69e",
      externalLink: "https://musicbrainz.org/work/fe5aaf8c-2197-49e8-be92-721383a9b69e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "nasty",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:46:11.391Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
