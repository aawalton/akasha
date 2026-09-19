import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAHome = {
  id: "01a0b72f-23bb-70c3-b319-af858af38e20",
  type: "page-type/song",
  slug: "james-taylor-a-home",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "415f989b-35ae-356e-aeb6-1bbf12c8646a",
      externalLink: "https://musicbrainz.org/work/415f989b-35ae-356e-aeb6-1bbf12c8646a",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "A Home",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
