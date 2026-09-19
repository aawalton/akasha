import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorPayday = {
  id: "01a0b72f-32e9-7473-9cef-f9307877c011",
  type: "page-type/song",
  slug: "james-taylor-payday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "12d7bd64-8a5c-4d5f-8fc1-dd12c4fe726d",
      externalLink: "https://musicbrainz.org/work/12d7bd64-8a5c-4d5f-8fc1-dd12c4fe726d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Payday",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
