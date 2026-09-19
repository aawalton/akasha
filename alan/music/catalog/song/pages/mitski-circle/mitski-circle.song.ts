import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiCircle = {
  id: "019f0e9f-3210-7235-b178-54e290e606e7",
  type: "page-type/song",
  slug: "mitski-circle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ed5f457-1d4b-4fc2-beee-11f79f65e2d8",
      externalLink: "https://musicbrainz.org/work/3ed5f457-1d4b-4fc2-beee-11f79f65e2d8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Circle",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
