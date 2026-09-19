import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDeathAndAllHisFriends = {
  id: "01a0ba5d-4844-7973-b9bb-a463578ed88a",
  type: "page-type/song",
  slug: "coldplay-death-and-all-his-friends",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dc105d08-5c42-34b5-986e-f901cefc806e",
      externalLink: "https://musicbrainz.org/work/dc105d08-5c42-34b5-986e-f901cefc806e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Death and All His Friends",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
