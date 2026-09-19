import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaToBeHuman = {
  id: "019ea4cc-8977-7efd-b993-dc6dd1ade09a",
  type: "page-type/song",
  slug: "sia-to-be-human",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65027280-f313-4c78-9064-74183f5eb5fb",
      externalLink: "https://musicbrainz.org/work/65027280-f313-4c78-9064-74183f5eb5fb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "To Be Human",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
