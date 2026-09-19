import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonNeverGonnaDie = {
  id: "019ea49f-0639-7438-bd40-a737be7e27f7",
  type: "page-type/song",
  slug: "zara-larsson-never-gonna-die",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4440591c-ddd0-4bdf-acf4-ab39a91696cb",
      externalLink: "https://musicbrainz.org/work/4440591c-ddd0-4bdf-acf4-ab39a91696cb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Never Gonna Die",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
