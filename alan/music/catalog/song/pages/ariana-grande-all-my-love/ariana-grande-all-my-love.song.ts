import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAllMyLove = {
  id: "019ea4e2-f73e-78c6-be13-00e14893a30e",
  type: "page-type/song",
  slug: "ariana-grande-all-my-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be7915d4-60a6-4433-b930-e19d7099fb72",
      externalLink: "https://musicbrainz.org/work/be7915d4-60a6-4433-b930-e19d7099fb72",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All My Love",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
