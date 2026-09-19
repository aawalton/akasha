import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayChineseSleepChant = {
  id: "01a0ba5d-4192-7546-996a-54552c44104f",
  type: "page-type/song",
  slug: "coldplay-chinese-sleep-chant",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "900b61b5-0543-40f0-9700-5789fdd849c7",
      externalLink: "https://musicbrainz.org/work/900b61b5-0543-40f0-9700-5789fdd849c7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Chinese Sleep Chant",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
