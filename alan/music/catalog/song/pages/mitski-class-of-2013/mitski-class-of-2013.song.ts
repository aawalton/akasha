import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiClassOf2013 = {
  id: "019f0e9c-eadc-73aa-b1ef-caf1adf3490b",
  type: "page-type/song",
  slug: "mitski-class-of-2013",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "18354fdb-e29f-47cc-becc-d15cd703dac5",
      externalLink: "https://musicbrainz.org/work/18354fdb-e29f-47cc-becc-d15cd703dac5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Class of 2013",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
