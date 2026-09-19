import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAtlas = {
  id: "01a0ba5d-3872-74ff-b151-29b2833be480",
  type: "page-type/song",
  slug: "coldplay-atlas",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "067b5e9e-3ad9-4672-bf79-8ee9e4554155",
      externalLink: "https://musicbrainz.org/work/067b5e9e-3ad9-4672-bf79-8ee9e4554155",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Atlas",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
