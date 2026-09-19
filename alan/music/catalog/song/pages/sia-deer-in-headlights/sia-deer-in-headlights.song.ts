import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDeerInHeadlights = {
  id: "019ea4c4-7911-7561-9816-12e0c9443493",
  type: "page-type/song",
  slug: "sia-deer-in-headlights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "80153345-960f-4d66-8775-75abc0cd112c",
      externalLink: "https://musicbrainz.org/work/80153345-960f-4d66-8775-75abc0cd112c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Deer in Headlights",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
