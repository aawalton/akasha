import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBadToYou = {
  id: "019ea4e0-ebb5-7975-853b-6c9f83b13ad9",
  type: "page-type/song",
  slug: "ariana-grande-bad-to-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3650e75c-6c93-48dc-a685-264dabdd8ed4",
      externalLink: "https://musicbrainz.org/work/3650e75c-6c93-48dc-a685-264dabdd8ed4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bad to You",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
