import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBeautifulThingsCanHappen = {
  id: "019ea4c3-9e4b-7b70-a031-7975262fa052",
  type: "page-type/song",
  slug: "sia-beautiful-things-can-happen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4b75cd07-277d-45e6-896f-b9ffd3769ad3",
      externalLink: "https://musicbrainz.org/work/4b75cd07-277d-45e6-896f-b9ffd3769ad3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Beautiful Things Can Happen",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
