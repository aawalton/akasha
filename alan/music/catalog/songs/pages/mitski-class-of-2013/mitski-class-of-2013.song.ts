import type { Song } from "../../song.page-type.types.ts"

export const mitskiClassOf2013 = {
  id: "019f0e9c-eadc-73aa-b1ef-caf1adf3490b",
  pageTypeSlug: "song",
  type: "song",
  slug: "mitski-class-of-2013",
  title: "Class of 2013",
  artist: "mitski",
  externalId: "18354fdb-e29f-47cc-becc-d15cd703dac5",
  externalLink: "https://musicbrainz.org/work/18354fdb-e29f-47cc-becc-d15cd703dac5",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-28",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
