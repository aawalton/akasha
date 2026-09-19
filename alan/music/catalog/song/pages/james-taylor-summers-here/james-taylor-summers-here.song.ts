import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSummersHere = {
  id: "01a0b72f-5850-742f-9f97-8320b7e663d9",
  type: "page-type/song",
  slug: "james-taylor-summers-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ef327770-ac7d-48eb-b753-ab9117919579",
      externalLink: "https://musicbrainz.org/work/ef327770-ac7d-48eb-b753-ab9117919579",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Summer’s Here",
  artist: "artist/james-taylor",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
