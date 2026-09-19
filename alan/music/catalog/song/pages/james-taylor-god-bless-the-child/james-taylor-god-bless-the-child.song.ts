import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGodBlessTheChild = {
  id: "01a0b72f-1f84-7fc4-898a-38624d777134",
  type: "page-type/song",
  slug: "james-taylor-god-bless-the-child",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "066bea58-1480-3152-83ed-bbd4f37b23f7",
      externalLink: "https://musicbrainz.org/work/066bea58-1480-3152-83ed-bbd4f37b23f7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "God Bless the Child",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
