import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayWeNeverChange = {
  id: "01a0ba60-fabe-74a7-ba52-d7bdb407bf61",
  type: "page-type/song",
  slug: "coldplay-we-never-change",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ce7e1845-68cd-304c-9c73-16f38b265293",
      externalLink: "https://musicbrainz.org/work/ce7e1845-68cd-304c-9c73-16f38b265293",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "We Never Change",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
