import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplaySpeedOfSound = {
  id: "01a0ba5d-5187-7c39-839b-6055e8a54185",
  type: "page-type/song",
  slug: "coldplay-speed-of-sound",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5b5ab76f-359b-3f90-be40-71cc9d859da9",
      externalLink: "https://musicbrainz.org/work/5b5ab76f-359b-3f90-be40-71cc9d859da9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Speed of Sound",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
