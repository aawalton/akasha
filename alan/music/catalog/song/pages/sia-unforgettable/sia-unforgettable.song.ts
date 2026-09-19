import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaUnforgettable = {
  id: "019ea4cb-fb29-7251-9486-5a0c747b7b6b",
  type: "page-type/song",
  slug: "sia-unforgettable",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ee29e3d-b17e-38dc-b5ed-47b1a039c1be",
      externalLink: "https://musicbrainz.org/work/3ee29e3d-b17e-38dc-b5ed-47b1a039c1be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Unforgettable",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
