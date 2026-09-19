import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeCadillacSong = {
  id: "019ea4e3-5a77-7039-8590-f483887fa816",
  type: "page-type/song",
  slug: "ariana-grande-cadillac-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8159d2c-3207-49c1-8d95-81fc593e09cf",
      externalLink: "https://musicbrainz.org/work/d8159d2c-3207-49c1-8d95-81fc593e09cf",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cadillac Song",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
