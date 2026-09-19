import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSuiteFor20G = {
  id: "01a0b72f-5425-7a4e-bdb4-70d8e7a8cb87",
  type: "page-type/song",
  slug: "james-taylor-suite-for-20-g",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c2c4bec7-2650-34ac-9af6-7ad4652de03b",
      externalLink: "https://musicbrainz.org/work/c2c4bec7-2650-34ac-9af6-7ad4652de03b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Suite for 20 G",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
} as const satisfies Song
