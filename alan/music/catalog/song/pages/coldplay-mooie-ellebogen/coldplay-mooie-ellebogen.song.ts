import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMooieEllebogen = {
  id: "01a0ba60-fd6c-7b53-ade5-96916cdc5b9d",
  type: "page-type/song",
  slug: "coldplay-mooie-ellebogen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ebfe658d-450f-4d8c-8a25-8d6353d74437",
      externalLink: "https://musicbrainz.org/work/ebfe658d-450f-4d8c-8a25-8d6353d74437",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mooie Ellebogen",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
