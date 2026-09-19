import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaThistles = {
  id: "019ea4ce-7f0f-793e-b26f-73eda4d9bf32",
  type: "page-type/song",
  slug: "sia-thistles",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef2d042c-622b-4cd2-8751-e7abbacc0ac5",
      externalLink: "https://musicbrainz.org/work/ef2d042c-622b-4cd2-8751-e7abbacc0ac5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Thistles",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
