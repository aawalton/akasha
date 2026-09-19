import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTime = {
  id: "019ea4e6-5ce8-73e0-ba22-63b6b9a02a45",
  type: "page-type/song",
  slug: "ariana-grande-time",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8f587596-84b4-4583-b559-e43de0bd3718",
      externalLink: "https://musicbrainz.org/work/8f587596-84b4-4583-b559-e43de0bd3718",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Time",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
