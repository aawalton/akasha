import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayBiutyful = {
  id: "01a0ba5d-3f75-7cd2-9ba1-3c7b0740035c",
  type: "page-type/song",
  slug: "coldplay-biutyful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7a05f4cd-11e4-4c61-b7c0-450738b92aca",
      externalLink: "https://musicbrainz.org/work/7a05f4cd-11e4-4c61-b7c0-450738b92aca",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Biutyful",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
