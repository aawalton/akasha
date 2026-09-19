import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilish8 = {
  id: "019ea4ac-26c3-7f1d-856d-e160bd46cf1f",
  type: "page-type/song",
  slug: "billie-eilish-8",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ea39d187-f68d-432d-b975-8a8f5131b229",
      externalLink: "https://musicbrainz.org/work/ea39d187-f68d-432d-b975-8a8f5131b229",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "8",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
