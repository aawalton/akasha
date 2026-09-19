import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysGodRestYeMerryGentlemen = {
  id: "01a0b71e-9905-7916-9f9c-1a41ed5aa18b",
  type: "page-type/song",
  slug: "the-piano-guys-god-rest-ye-merry-gentlemen",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2bbaee8d-5c82-3f3d-be50-8363bade7773",
      externalLink: "https://musicbrainz.org/work/2bbaee8d-5c82-3f3d-be50-8363bade7773",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "God Rest Ye Merry, Gentlemen",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
