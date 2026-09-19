import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWeAllFallInLoveSometimes = {
  id: "01a0ba60-fe48-7791-9d82-5c8edcb09489",
  type: "page-type/song",
  slug: "coldplay-we-all-fall-in-love-sometimes",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f890a807-25c1-4772-8191-b8ee4d8b55c6",
      externalLink: "https://musicbrainz.org/work/f890a807-25c1-4772-8191-b8ee4d8b55c6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We All Fall in Love Sometimes",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
