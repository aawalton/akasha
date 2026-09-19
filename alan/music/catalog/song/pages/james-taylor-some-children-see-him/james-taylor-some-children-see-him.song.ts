import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomeChildrenSeeHim = {
  id: "01a0b779-8ae1-7729-934b-83364f4e7d90",
  type: "page-type/song",
  slug: "james-taylor-some-children-see-him",
  title: "Some Children See Him",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
