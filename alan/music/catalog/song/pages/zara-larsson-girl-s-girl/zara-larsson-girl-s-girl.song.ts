import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonGirlSGirl = {
  id: "019ea49e-752e-7ae5-be8d-d5a5bcabd1fe",
  type: "page-type/song",
  slug: "zara-larsson-girl-s-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "23989f54-ec6e-4345-8501-4abc021e4fd4",
      externalLink: "https://musicbrainz.org/work/23989f54-ec6e-4345-8501-4abc021e4fd4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Girl’s Girl",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
