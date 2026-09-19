import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxChampagneCigarettes = {
  id: "019ea4f5-b5f6-7302-a813-da0bfd11a0cc",
  type: "page-type/song",
  slug: "lilith-max-champagne-cigarettes",
  title: "Champagne & Cigarettes",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e19a446e-30da-4414-95fe-41d3c69c3d5d",
      externalLink: "https://musicbrainz.org/recording/e19a446e-30da-4414-95fe-41d3c69c3d5d",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
