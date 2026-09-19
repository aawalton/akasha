import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraItHappenedQuiet = {
  id: "019ea4a5-d9a7-7099-82f9-f94ca1e3c293",
  type: "page-type/song",
  slug: "aurora-it-happened-quiet",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "71e5c2f0-ff2e-4a84-8353-13136d39c405",
      externalLink: "https://musicbrainz.org/work/71e5c2f0-ff2e-4a84-8353-13136d39c405",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "It Happened Quiet",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
