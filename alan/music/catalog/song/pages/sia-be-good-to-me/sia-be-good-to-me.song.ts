import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBeGoodToMe = {
  id: "019ea4c5-863f-7dd6-add1-c2ea7f69eca1",
  type: "page-type/song",
  slug: "sia-be-good-to-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bc3d1f6c-97f7-48dc-a39a-3483ab55b020",
      externalLink: "https://musicbrainz.org/work/bc3d1f6c-97f7-48dc-a39a-3483ab55b020",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Be Good to Me",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
