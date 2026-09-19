import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLunch = {
  id: "019ea4aa-33ea-7287-ae60-9320c8da624f",
  type: "page-type/song",
  slug: "billie-eilish-lunch",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7e79557a-2452-44d9-8e71-585228633fb8",
      externalLink: "https://musicbrainz.org/work/7e79557a-2452-44d9-8e71-585228633fb8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "LUNCH",
  artist: "artist/billie-eilish",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
