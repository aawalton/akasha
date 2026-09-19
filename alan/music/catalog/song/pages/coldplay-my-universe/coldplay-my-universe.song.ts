import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMyUniverse = {
  id: "01a0ba5d-52eb-79a2-911e-6f59c5ce0688",
  type: "page-type/song",
  slug: "coldplay-my-universe",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "66488a24-fd9a-4440-ae60-91713b29d9d4",
      externalLink: "https://musicbrainz.org/work/66488a24-fd9a-4440-ae60-91713b29d9d4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "My Universe",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
