import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMrKnowItAll = {
  id: "019ea4ae-d4df-7b25-968d-11b1e5461fc0",
  type: "page-type/song",
  slug: "kelly-clarkson-mr-know-it-all",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6f79a4d5-d30d-4915-8cfa-538cb0507953",
      externalLink: "https://musicbrainz.org/work/6f79a4d5-d30d-4915-8cfa-538cb0507953",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mr. Know It All",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
