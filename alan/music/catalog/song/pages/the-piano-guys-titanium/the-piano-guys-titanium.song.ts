import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTitanium = {
  id: "01a0b71e-9ce1-7c34-90bd-5efe3f526e2a",
  type: "page-type/song",
  slug: "the-piano-guys-titanium",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b1bcb727-5520-4e83-aee3-e182fd6b076d",
      externalLink: "https://musicbrainz.org/work/b1bcb727-5520-4e83-aee3-e182fd6b076d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Titanium",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
