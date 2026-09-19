import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayARushOfBloodToTheHead = {
  id: "01a0ba5d-3b5b-759b-bac4-cfa17e2c12cf",
  type: "page-type/song",
  slug: "coldplay-a-rush-of-blood-to-the-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "33c23a73-237d-3c5a-ae99-fc275bca26d1",
      externalLink: "https://musicbrainz.org/work/33c23a73-237d-3c5a-ae99-fc275bca26d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Rush of Blood to the Head",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
