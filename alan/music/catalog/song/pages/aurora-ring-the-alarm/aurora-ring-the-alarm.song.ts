import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRingTheAlarm = {
  id: "019ea4a7-29f1-7235-b97a-2f56610953f7",
  type: "page-type/song",
  slug: "aurora-ring-the-alarm",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d302bbb8-d8d3-4e63-be6b-6817b594ebdc",
      externalLink: "https://musicbrainz.org/work/d302bbb8-d8d3-4e63-be6b-6817b594ebdc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "RING THE ALARM",
  artist: "artist/aurora",
  songType: "original",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
