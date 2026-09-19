import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiBlueLight = {
  id: "019f0e9d-11f4-7cad-b023-aa4a521ba28c",
  type: "page-type/song",
  slug: "mitski-blue-light",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1990a898-c332-485a-a45d-541b54e42f3e",
      externalLink: "https://musicbrainz.org/work/1990a898-c332-485a-a45d-541b54e42f3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blue Light",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
