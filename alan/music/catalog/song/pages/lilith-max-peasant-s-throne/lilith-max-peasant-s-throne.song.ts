import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxPeasantSThrone = {
  id: "019ea4f6-26a8-7302-81a0-a4298ab4ab4d",
  type: "page-type/song",
  slug: "lilith-max-peasant-s-throne",
  title: "Peasant's Throne",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2fd2fca5-c875-479e-91a3-30ca71ccf7c9",
      externalLink: "https://musicbrainz.org/recording/2fd2fca5-c875-479e-91a3-30ca71ccf7c9",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
