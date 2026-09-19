import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheWay = {
  id: "019ea4e5-cdd3-703f-a1d2-afcc525f5aa5",
  type: "page-type/song",
  slug: "ariana-grande-the-way",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "695398e2-7398-4689-95cc-5ec0a97183cd",
      externalLink: "https://musicbrainz.org/work/695398e2-7398-4689-95cc-5ec0a97183cd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Way",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
