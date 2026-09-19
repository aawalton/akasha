import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonMakeThatMoneyGirl = {
  id: "019ea4a1-9e5e-7c26-8543-d711650e8d86",
  type: "page-type/song",
  slug: "zara-larsson-make-that-money-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cc5a8332-554d-48a3-8462-6ee28c7bc8e7",
      externalLink: "https://musicbrainz.org/work/cc5a8332-554d-48a3-8462-6ee28c7bc8e7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Make That Money Girl",
  artist: "artist/zara-larsson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
