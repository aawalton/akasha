import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaHelium = {
  id: "019ea4c7-95fd-7fa7-9065-45c7f2d1cafd",
  type: "page-type/song",
  slug: "sia-helium",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
      externalLink: "https://musicbrainz.org/work/409a4e77-d377-4b6c-acf8-0c29fcd6e8dc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Helium",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
