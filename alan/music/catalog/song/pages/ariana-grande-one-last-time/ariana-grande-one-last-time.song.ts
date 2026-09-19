import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeOneLastTime = {
  id: "019ea4e8-0b28-7493-b2f4-dfcca82c0f8e",
  type: "page-type/song",
  slug: "ariana-grande-one-last-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e89c9f93-2fa9-4134-b74f-1863433c6e38",
      externalLink: "https://musicbrainz.org/work/e89c9f93-2fa9-4134-b74f-1863433c6e38",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Last Time",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
