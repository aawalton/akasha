import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSilentNight = {
  id: "01a0ba7f-bd41-7422-9e90-8e619e09c727",
  type: "page-type/song",
  slug: "kelly-clarkson-silent-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      externalLink: "https://musicbrainz.org/work/590e5567-c188-31f0-b7a8-a94e7e51c7b3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Silent Night",
  artist: "artist/kelly-clarkson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
