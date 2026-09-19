import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBringHimHome = {
  id: "01a0b71e-9bdb-745d-8e0c-831bafe5a0ba",
  type: "page-type/song",
  slug: "the-piano-guys-bring-him-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "86a79468-d8c8-3651-b867-55be9008494d",
      externalLink: "https://musicbrainz.org/work/86a79468-d8c8-3651-b867-55be9008494d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Bring Him Home",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
