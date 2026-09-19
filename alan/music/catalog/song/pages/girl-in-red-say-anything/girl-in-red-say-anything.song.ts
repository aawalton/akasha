import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedSayAnything = {
  id: "01a0b724-d5af-740e-9632-17d864895936",
  type: "page-type/song",
  slug: "girl-in-red-say-anything",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "cd93a02c-8bad-48ba-a263-87a98c50a917",
      externalLink: "https://musicbrainz.org/work/cd93a02c-8bad-48ba-a263-87a98c50a917",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "say anything",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
