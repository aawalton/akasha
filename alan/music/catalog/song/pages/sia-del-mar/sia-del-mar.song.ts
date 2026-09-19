import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDelMar = {
  id: "019ea4c3-5605-78cd-a751-041d186d0b13",
  type: "page-type/song",
  slug: "sia-del-mar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2baa81c4-5aff-4ee6-81c6-a7d8bdebfb6c",
      externalLink: "https://musicbrainz.org/work/2baa81c4-5aff-4ee6-81c6-a7d8bdebfb6c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Del mar",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
