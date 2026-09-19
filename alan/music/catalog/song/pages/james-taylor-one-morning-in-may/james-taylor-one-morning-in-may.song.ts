import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOneMorningInMay = {
  id: "01a0b72f-3ca5-7b9a-a09a-be9d65a45ef7",
  type: "page-type/song",
  slug: "james-taylor-one-morning-in-may",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a4c1ba5c-f181-45a0-9b83-1037b879fd78",
      externalLink: "https://musicbrainz.org/work/a4c1ba5c-f181-45a0-9b83-1037b879fd78",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Morning in May",
  artist: "artist/james-taylor",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
