import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooEarthquake = {
  id: "01a0b724-3825-717b-a5d0-f9d97fa355bd",
  type: "page-type/song",
  slug: "jisoo-earthquake",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1477d866-1171-4cba-9ec7-1eaedb46afea",
      externalLink: "https://musicbrainz.org/work/1477d866-1171-4cba-9ec7-1eaedb46afea",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "earthquake",
  artist: "artist/jisoo",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
