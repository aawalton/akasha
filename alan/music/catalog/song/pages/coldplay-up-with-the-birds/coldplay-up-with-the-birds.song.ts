import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUpWithTheBirds = {
  id: "01a0ba5d-4f6d-7377-8bda-d28a3e86b8af",
  type: "page-type/song",
  slug: "coldplay-up-with-the-birds",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4d623381-c211-4915-99dc-d290610bbadb",
      externalLink: "https://musicbrainz.org/work/4d623381-c211-4915-99dc-d290610bbadb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up With the Birds",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
