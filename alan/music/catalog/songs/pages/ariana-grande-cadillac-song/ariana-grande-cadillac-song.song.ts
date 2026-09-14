import type { Song } from "akasha/alan/music/catalog/songs/song.page-type.types.ts"

export const arianaGrandeCadillacSong = {
  id: "019ea4e3-5a77-7039-8590-f483887fa816",
  type: "song",
  slug: "ariana-grande-cadillac-song",
  title: "Cadillac Song",
  artist: "artist/ariana-grande",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d8159d2c-3207-49c1-8d95-81fc593e09cf",
      externalLink: "https://musicbrainz.org/work/d8159d2c-3207-49c1-8d95-81fc593e09cf",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
