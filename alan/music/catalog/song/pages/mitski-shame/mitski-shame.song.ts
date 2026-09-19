import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiShame = {
  id: "019f0ea4-2b86-7dde-89a5-a2ee9c6213d9",
  type: "page-type/song",
  slug: "mitski-shame",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "94e6fae5-9a90-4f8a-abe1-a9c5ec8e43f1",
      externalLink: "https://musicbrainz.org/work/94e6fae5-9a90-4f8a-abe1-a9c5ec8e43f1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Shame",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
