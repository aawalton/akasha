import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorCarolinaInMyMind = {
  id: "01a0b72f-2983-7918-9c7f-27d031a54b37",
  type: "page-type/song",
  slug: "james-taylor-carolina-in-my-mind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "90fe4c45-2264-385f-8573-0c8602e03a96",
      externalLink: "https://musicbrainz.org/work/90fe4c45-2264-385f-8573-0c8602e03a96",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Carolina in My Mind",
  artist: "artist/james-taylor",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
