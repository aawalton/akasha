import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaDanceAlone = {
  id: "019ea4c4-6fc0-7a3a-879a-86961ee4c482",
  type: "page-type/song",
  slug: "sia-dance-alone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7f15e292-5ba6-40eb-8250-15564a87ff3e",
      externalLink: "https://musicbrainz.org/work/7f15e292-5ba6-40eb-8250-15564a87ff3e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dance Alone",
  artist: "artist/sia",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
