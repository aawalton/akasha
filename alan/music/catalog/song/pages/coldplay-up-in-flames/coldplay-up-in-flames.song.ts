import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUpInFlames = {
  id: "01a0ba60-f933-7502-af71-741039598257",
  type: "page-type/song",
  slug: "coldplay-up-in-flames",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b38cc813-c93b-46f9-b9a9-d294195fd1c2",
      externalLink: "https://musicbrainz.org/work/b38cc813-c93b-46f9-b9a9-d294195fd1c2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up in Flames",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
