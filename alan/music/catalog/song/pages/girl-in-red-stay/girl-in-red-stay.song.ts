import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedStay = {
  id: "01a0b724-d2af-7cac-a2cb-e1b82eb3e97f",
  type: "page-type/song",
  slug: "girl-in-red-stay",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "565b2dae-b14a-4511-85e4-47c70cc6d1fd",
      externalLink: "https://musicbrainz.org/work/565b2dae-b14a-4511-85e4-47c70cc6d1fd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "STAY",
  artist: "artist/girl-in-red",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
