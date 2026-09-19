import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWinterThings = {
  id: "019ea4e7-fa42-724d-87e8-ebdc6e523b37",
  type: "page-type/song",
  slug: "ariana-grande-winter-things",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e84114d6-dd29-474b-a8eb-ac8d461196dd",
      externalLink: "https://musicbrainz.org/work/e84114d6-dd29-474b-a8eb-ac8d461196dd",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Things",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
