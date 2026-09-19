import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorInstrumentalIi = {
  id: "01a0b72f-387d-7bb7-bf03-25bb8d0f08e0",
  type: "page-type/song",
  slug: "james-taylor-instrumental-ii",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "686e4f8b-18da-42ce-bbc6-4025ddea81be",
      externalLink: "https://musicbrainz.org/work/686e4f8b-18da-42ce-bbc6-4025ddea81be",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Instrumental II",
  artist: "artist/james-taylor",
  performed: true,
  written: "solo",
} as const satisfies Song
