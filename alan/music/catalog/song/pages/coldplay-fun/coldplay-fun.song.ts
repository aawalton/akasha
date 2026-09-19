import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayFun = {
  id: "01a0ba5d-4544-7a48-bd51-55eb0d9cce3f",
  type: "page-type/song",
  slug: "coldplay-fun",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b864e569-ea82-4f61-a91d-f06d6d82bd58",
      externalLink: "https://musicbrainz.org/work/b864e569-ea82-4f61-a91d-f06d6d82bd58",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fun",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
