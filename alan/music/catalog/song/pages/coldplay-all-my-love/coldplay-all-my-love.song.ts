import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayAllMyLove = {
  id: "01a0ba5d-42ed-7a60-bfa9-59ddaf8a06d7",
  type: "page-type/song",
  slug: "coldplay-all-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "99658db3-4fd2-4e13-a257-c0608d5f86d1",
      externalLink: "https://musicbrainz.org/work/99658db3-4fd2-4e13-a257-c0608d5f86d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "ALL MY LOVE",
  artist: "artist/coldplay",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
