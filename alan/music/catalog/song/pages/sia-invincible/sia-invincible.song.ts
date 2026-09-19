import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaInvincible = {
  id: "019ea4af-99f8-765e-bdb2-1a0be4b3708e",
  type: "page-type/song",
  slug: "sia-invincible",
  partOfCollections: ["artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "a5ca49c1-1b32-43e2-9e32-b304550b2961",
      externalLink: "https://musicbrainz.org/work/a5ca49c1-1b32-43e2-9e32-b304550b2961",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Invincible",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
