import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysPicturesAtAnExhibition = {
  id: "01a0b71e-99f5-7639-a27d-55d4addcd884",
  type: "page-type/song",
  slug: "the-piano-guys-pictures-at-an-exhibition",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "42eb4060-0c1e-4126-87c3-b647ccf69f45",
      externalLink: "https://musicbrainz.org/work/42eb4060-0c1e-4126-87c3-b647ccf69f45",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Pictures at an Exhibition",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
