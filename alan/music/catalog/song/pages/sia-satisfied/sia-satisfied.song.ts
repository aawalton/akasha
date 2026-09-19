import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSatisfied = {
  id: "019ea4cb-c750-761d-8edb-1f33fa3f772d",
  type: "page-type/song",
  slug: "sia-satisfied",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ac3f0d2-8c53-4ee5-87d7-da90fec74458",
      externalLink: "https://musicbrainz.org/work/3ac3f0d2-8c53-4ee5-87d7-da90fec74458",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Satisfied",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
