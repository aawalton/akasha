import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMyloXyloto = {
  id: "01a0ba5d-4eec-7ac8-a80a-2918120d5f32",
  type: "page-type/song",
  slug: "coldplay-mylo-xyloto",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f54db47-112e-4c0b-9df3-f417284830a4",
      externalLink: "https://musicbrainz.org/work/3f54db47-112e-4c0b-9df3-f417284830a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mylo Xyloto",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
