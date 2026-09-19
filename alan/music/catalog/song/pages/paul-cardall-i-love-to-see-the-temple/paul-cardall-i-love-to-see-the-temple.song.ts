import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallILoveToSeeTheTemple = {
  id: "01a0b77e-695a-71e7-a4f1-b87e7aaddc58",
  type: "page-type/song",
  slug: "paul-cardall-i-love-to-see-the-temple",
  title: "I Love to See the Temple",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
