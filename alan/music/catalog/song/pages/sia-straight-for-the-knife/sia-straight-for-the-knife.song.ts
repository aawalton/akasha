import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaStraightForTheKnife = {
  id: "019ea4cc-0f6a-75b1-9188-2f9b8c51b027",
  type: "page-type/song",
  slug: "sia-straight-for-the-knife",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "434e6c08-3809-4c9b-ab53-745726f140a4",
      externalLink: "https://musicbrainz.org/work/434e6c08-3809-4c9b-ab53-745726f140a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Straight for the Knife",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
