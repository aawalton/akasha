import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSlowBurningLove = {
  id: "01a0b72f-4a5e-75a4-baf1-00e6e0d8d1ed",
  type: "page-type/song",
  slug: "james-taylor-slow-burning-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3893989a-96bb-4e09-a671-44d77ae16e51",
      externalLink: "https://musicbrainz.org/work/3893989a-96bb-4e09-a671-44d77ae16e51",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Slow Burning Love",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
