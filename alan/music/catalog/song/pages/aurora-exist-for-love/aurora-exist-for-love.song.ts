import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraExistForLove = {
  id: "019ea4a5-adcc-7752-9e0a-faeac8887c32",
  type: "page-type/song",
  slug: "aurora-exist-for-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6c94292e-ad76-4396-99bf-e6367e8c12ea",
      externalLink: "https://musicbrainz.org/work/6c94292e-ad76-4396-99bf-e6367e8c12ea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Exist for Love",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
