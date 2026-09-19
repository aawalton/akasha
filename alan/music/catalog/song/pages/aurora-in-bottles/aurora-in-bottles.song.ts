import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraInBottles = {
  id: "019ea4a5-5510-738e-97b7-efd45d7ab827",
  type: "page-type/song",
  slug: "aurora-in-bottles",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62e9ac10-139c-43be-aecf-cdf11721ce58",
      externalLink: "https://musicbrainz.org/work/62e9ac10-139c-43be-aecf-cdf11721ce58",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "In Bottles",
  artist: "artist/aurora",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
