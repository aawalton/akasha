import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const ejaeTakeItSlow = {
  id: "01a0d3ab-22a7-7f2d-8ed1-9ac5800d89ba",
  type: "page-type/song",
  slug: "ejae-take-it-slow",
  title: "Take it slow",
  artist: "artist/ejae",
  performed: true,
} as const satisfies Song
