import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiLoveMeMore = {
  id: "019f0ea1-008f-72d2-a0ba-4bd4bfa04893",
  type: "page-type/song",
  slug: "mitski-love-me-more",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5e6fa672-9149-40a3-ad80-9995db2f960f",
      externalLink: "https://musicbrainz.org/work/5e6fa672-9149-40a3-ad80-9995db2f960f",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Love Me More",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
