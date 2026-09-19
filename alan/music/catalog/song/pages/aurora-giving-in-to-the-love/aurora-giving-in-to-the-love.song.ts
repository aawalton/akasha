import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraGivingInToTheLove = {
  id: "019ea4a6-d0e9-7929-8ed4-6f6c04f3ba0d",
  type: "page-type/song",
  slug: "aurora-giving-in-to-the-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bec8a290-1480-40c3-bcbd-a790f4f59f37",
      externalLink: "https://musicbrainz.org/work/bec8a290-1480-40c3-bcbd-a790f4f59f37",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Giving In to the Love",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
