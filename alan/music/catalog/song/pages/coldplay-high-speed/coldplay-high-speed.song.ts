import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayHighSpeed = {
  id: "01a0ba5d-43ab-71e8-8148-657ab9beb2a7",
  type: "page-type/song",
  slug: "coldplay-high-speed",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a8daf0fd-927f-3f34-8dd3-2960eea97e4c",
      externalLink: "https://musicbrainz.org/work/a8daf0fd-927f-3f34-8dd3-2960eea97e4c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "High Speed",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
