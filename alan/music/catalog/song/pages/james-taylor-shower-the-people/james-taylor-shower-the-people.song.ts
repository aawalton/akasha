import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorShowerThePeople = {
  id: "01a0b72f-4953-7ba7-a60a-2a9dc7654a87",
  type: "page-type/song",
  slug: "james-taylor-shower-the-people",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2cae46fe-fa09-39db-9c62-5e4bcd4985fa",
      externalLink: "https://musicbrainz.org/work/2cae46fe-fa09-39db-9c62-5e4bcd4985fa",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shower the People",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
