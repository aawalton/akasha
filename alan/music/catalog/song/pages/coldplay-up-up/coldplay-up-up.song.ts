import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayUpUp = {
  id: "01a0ba60-f603-74bf-be41-137eb3fc1971",
  type: "page-type/song",
  slug: "coldplay-up-up",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a0a16da7-6b46-454d-b0ab-13e1120b0960",
      externalLink: "https://musicbrainz.org/work/a0a16da7-6b46-454d-b0ab-13e1120b0960",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Up&Up",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
