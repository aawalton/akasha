import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedApartment402 = {
  id: "01a0b724-d123-74b8-a26e-b367c055c151",
  type: "page-type/song",
  slug: "girl-in-red-apartment-402",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26474c1b-711b-4616-952c-9e0fa0c484d2",
      externalLink: "https://musicbrainz.org/work/26474c1b-711b-4616-952c-9e0fa0c484d2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Apartment 402",
  artist: "artist/girl-in-red",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
