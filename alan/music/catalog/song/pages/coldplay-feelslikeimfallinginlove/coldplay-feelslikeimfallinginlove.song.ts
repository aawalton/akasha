import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayFeelslikeimfallinginlove = {
  id: "01a0ba5d-3cc7-7970-9626-71be47af9e07",
  type: "page-type/song",
  slug: "coldplay-feelslikeimfallinginlove",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "46521e5f-729b-44ab-9663-974f566716ac",
      externalLink: "https://musicbrainz.org/work/46521e5f-729b-44ab-9663-974f566716ac",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "feelslikeimfallinginlove",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
