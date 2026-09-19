import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWonderful = {
  id: "019ea4e5-7535-7e47-895f-7d5310cb8d53",
  type: "page-type/song",
  slug: "ariana-grande-wonderful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "60f57d98-4955-4bd4-be63-94dcaa63d6db",
      externalLink: "https://musicbrainz.org/work/60f57d98-4955-4bd4-be63-94dcaa63d6db",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wonderful",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
