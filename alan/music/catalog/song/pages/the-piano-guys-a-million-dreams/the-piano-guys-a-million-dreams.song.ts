import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAMillionDreams = {
  id: "01a0b71e-9a61-75c5-8dc4-f61d9d63d0ca",
  type: "page-type/song",
  slug: "the-piano-guys-a-million-dreams",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "551e27c0-5042-40ff-9662-fb30f7eca66d",
      externalLink: "https://musicbrainz.org/work/551e27c0-5042-40ff-9662-fb30f7eca66d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Million Dreams",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
