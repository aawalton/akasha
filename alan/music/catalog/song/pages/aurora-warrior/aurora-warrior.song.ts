import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWarrior = {
  id: "019ea4a2-ef86-78f5-b278-47e75a55ae02",
  type: "page-type/song",
  slug: "aurora-warrior",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0280cc1e-f51a-4a6a-8a07-c8d2c2aa7a2f",
      externalLink: "https://musicbrainz.org/work/0280cc1e-f51a-4a6a-8a07-c8d2c2aa7a2f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Warrior",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
