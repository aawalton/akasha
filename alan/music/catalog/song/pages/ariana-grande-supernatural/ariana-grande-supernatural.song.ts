import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSupernatural = {
  id: "019ea4e4-8210-76c9-a30b-7d1552535a41",
  type: "page-type/song",
  slug: "ariana-grande-supernatural",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2ff91c20-2753-4df2-9aae-07bc5cc33ab8",
      externalLink: "https://musicbrainz.org/work/2ff91c20-2753-4df2-9aae-07bc5cc33ab8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "supernatural",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
