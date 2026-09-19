import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayKaleidoscope = {
  id: "01a0ba60-fb16-7fd4-af61-fe579d94a826",
  type: "page-type/song",
  slug: "coldplay-kaleidoscope",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d158047f-eb8b-49ae-ace0-a5831b428c67",
      externalLink: "https://musicbrainz.org/work/d158047f-eb8b-49ae-ace0-a5831b428c67",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kaleidoscope",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
