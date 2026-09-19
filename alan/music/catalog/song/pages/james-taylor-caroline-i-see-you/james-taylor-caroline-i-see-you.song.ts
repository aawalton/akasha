import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCarolineISeeYou = {
  id: "01a0b72f-2677-7c0e-8cb2-8d02e2a1b3bc",
  type: "page-type/song",
  slug: "james-taylor-caroline-i-see-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6a285e1d-8436-4cdc-8be2-bdc2490b6c46",
      externalLink: "https://musicbrainz.org/work/6a285e1d-8436-4cdc-8be2-bdc2490b6c46",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Caroline I See You",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
