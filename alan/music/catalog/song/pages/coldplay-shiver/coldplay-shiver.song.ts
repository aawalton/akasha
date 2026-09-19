import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayShiver = {
  id: "01a0ba5d-4eb3-7b2a-b6c4-2de1e466b668",
  type: "page-type/song",
  slug: "coldplay-shiver",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3df23b8e-4be8-3604-9bda-f7732b6c6b1c",
      externalLink: "https://musicbrainz.org/work/3df23b8e-4be8-3604-9bda-f7732b6c6b1c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shiver",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
