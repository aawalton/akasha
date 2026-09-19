import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDejaVu = {
  id: "019ea4c2-d657-7db2-a9d2-92c8a6bb8ad4",
  type: "page-type/song",
  slug: "sia-deja-vu",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "104d2ce5-d9b6-465b-84e9-83b885be71d3",
      externalLink: "https://musicbrainz.org/work/104d2ce5-d9b6-465b-84e9-83b885be71d3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Déjà Vu",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
