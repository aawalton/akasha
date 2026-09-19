import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonSecondWind = {
  id: "019ea4b1-6274-77d2-9e28-ba2410731e12",
  type: "page-type/song",
  slug: "kelly-clarkson-second-wind",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "0d542b3a-7e10-4188-af4c-b4fe28cc7a03",
      externalLink: "https://musicbrainz.org/work/0d542b3a-7e10-4188-af4c-b4fe28cc7a03",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Second Wind",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
