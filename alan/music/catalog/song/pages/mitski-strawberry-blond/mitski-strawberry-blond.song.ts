import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiStrawberryBlond = {
  id: "019f0e9f-4c40-74ec-8075-ac8393078c49",
  type: "page-type/song",
  slug: "mitski-strawberry-blond",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3f4f96c3-4523-4313-8749-f461f802c3cb",
      externalLink: "https://musicbrainz.org/work/3f4f96c3-4523-4313-8749-f461f802c3cb",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Strawberry Blond",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
