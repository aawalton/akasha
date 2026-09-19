import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSailingToPhiladelphia = {
  id: "01a0b72f-49dc-7b19-8711-4c0613822242",
  type: "page-type/song",
  slug: "james-taylor-sailing-to-philadelphia",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "309b07c0-f756-4d7d-be8f-6712ed419eae",
      externalLink: "https://musicbrainz.org/work/309b07c0-f756-4d7d-be8f-6712ed419eae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Sailing to Philadelphia",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
