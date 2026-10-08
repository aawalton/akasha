import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emBeiholdTooPrecious = {
  id: "019ea4df-2166-7dfe-80f5-e1bbf7b2905b",
  type: "page-type/song",
  slug: "em-beihold-too-precious",
  title: "Too Precious",
  artist: "artist/em-beihold",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "56aa3cd0-0f82-4e57-83bb-418823b30dba",
      externalLink: "https://musicbrainz.org/work/56aa3cd0-0f82-4e57-83bb-418823b30dba",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-08T01:35:47.046Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
