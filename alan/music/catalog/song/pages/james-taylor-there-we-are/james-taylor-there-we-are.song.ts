import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorThereWeAre = {
  id: "01a0b72f-4fb3-7fc6-aafd-ef3bca5a0d1a",
  type: "page-type/song",
  slug: "james-taylor-there-we-are",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "86d9f04e-e934-404d-b507-5eb98b51153e",
      externalLink: "https://musicbrainz.org/work/86d9f04e-e934-404d-b507-5eb98b51153e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "There We Are",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
