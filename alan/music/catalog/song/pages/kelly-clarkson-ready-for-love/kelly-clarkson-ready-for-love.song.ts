import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonReadyForLove = {
  id: "019ea4c1-73ca-735a-b974-de43d3e89a83",
  type: "page-type/song",
  slug: "kelly-clarkson-ready-for-love",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d1f8c751-d9bc-43c8-941c-29d4484873f0",
      externalLink: "https://musicbrainz.org/work/d1f8c751-d9bc-43c8-941c-29d4484873f0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Ready for Love",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
