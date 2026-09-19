import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaMiracle = {
  id: "019ea4c7-9e59-7333-b7df-b259e9bf133e",
  type: "page-type/song",
  slug: "sia-miracle",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "460ec193-9059-42ce-9052-4e04cedf029c",
      externalLink: "https://musicbrainz.org/work/460ec193-9059-42ce-9052-4e04cedf029c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Miracle",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
