import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaInsidiously = {
  id: "019ea4c7-b8f0-7157-bf40-8a1e3093530f",
  type: "page-type/song",
  slug: "sia-insidiously",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "53d0fe2f-de06-4854-b53c-e50bc54164c8",
      externalLink: "https://musicbrainz.org/work/53d0fe2f-de06-4854-b53c-e50bc54164c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Insidiously",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
