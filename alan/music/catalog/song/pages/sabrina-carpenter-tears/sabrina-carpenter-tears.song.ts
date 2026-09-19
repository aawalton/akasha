import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterTears = {
  id: "01a0b723-d35c-784a-86ee-aad784ab4df9",
  type: "page-type/song",
  slug: "sabrina-carpenter-tears",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4090ad93-10ef-4b6c-ba81-9a122ff3b802",
      externalLink: "https://musicbrainz.org/work/4090ad93-10ef-4b6c-ba81-9a122ff3b802",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Tears",
  artist: "artist/sabrina-carpenter",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
