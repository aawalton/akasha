import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCinemaParadisoSe = {
  id: "01a0b720-0bfc-7076-b83a-73c94de86474",
  type: "page-type/song",
  slug: "celtic-woman-cinema-paradiso-se",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "55021e68-2f90-39a0-85aa-169f78ce7fc2",
      externalLink: "https://musicbrainz.org/work/55021e68-2f90-39a0-85aa-169f78ce7fc2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cinema Paradiso (Se)",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
