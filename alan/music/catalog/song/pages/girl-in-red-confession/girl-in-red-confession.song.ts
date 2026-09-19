import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedConfession = {
  id: "01a0b724-d192-74ca-8ec0-e183a82319f2",
  type: "page-type/song",
  slug: "girl-in-red-confession",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "360bc5c6-d104-4928-aa93-e2c59579b15b",
      externalLink: "https://musicbrainz.org/work/360bc5c6-d104-4928-aa93-e2c59579b15b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "confession",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
