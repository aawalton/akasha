import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonOHolyNight = {
  id: "019ea4b1-f17c-73e2-b591-1653dd2e3289",
  type: "page-type/song",
  slug: "kelly-clarkson-o-holy-night",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      externalLink: "https://musicbrainz.org/work/368a7dea-3e18-4d46-86f9-3c31c5cb55a1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "O Holy Night",
  artist: "artist/kelly-clarkson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
