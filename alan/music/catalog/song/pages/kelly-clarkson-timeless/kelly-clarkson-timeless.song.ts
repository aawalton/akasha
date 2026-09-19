import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTimeless = {
  id: "019ea4c1-9231-7fd7-90c7-5dfea1d8872e",
  type: "page-type/song",
  slug: "kelly-clarkson-timeless",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f622d118-01c1-3696-ae9d-96d719e6dddb",
      externalLink: "https://musicbrainz.org/work/f622d118-01c1-3696-ae9d-96d719e6dddb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Timeless",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
