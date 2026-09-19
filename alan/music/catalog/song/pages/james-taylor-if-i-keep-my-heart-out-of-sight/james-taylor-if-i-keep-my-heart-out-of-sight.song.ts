import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorIfIKeepMyHeartOutOfSight = {
  id: "01a0b72f-44cb-7825-b6a7-4fdcb6c8adc2",
  type: "page-type/song",
  slug: "james-taylor-if-i-keep-my-heart-out-of-sight",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f918e7ef-ff90-4453-8768-c84c48bac573",
      externalLink: "https://musicbrainz.org/work/f918e7ef-ff90-4453-8768-c84c48bac573",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "If I Keep My Heart Out of Sight",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
