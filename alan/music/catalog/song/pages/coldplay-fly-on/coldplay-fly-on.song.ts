import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayFlyOn = {
  id: "01a0ba5d-46e8-75a7-9611-50260229b0c3",
  type: "page-type/song",
  slug: "coldplay-fly-on",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c814f404-0978-40ed-813e-db50d48e6a9d",
      externalLink: "https://musicbrainz.org/work/c814f404-0978-40ed-813e-db50d48e6a9d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Fly On",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
