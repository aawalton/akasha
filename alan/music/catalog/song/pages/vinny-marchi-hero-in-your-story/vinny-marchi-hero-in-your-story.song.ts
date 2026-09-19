import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiHeroInYourStory = {
  id: "01a0b783-a6e2-7b45-84f6-67ea118f130a",
  type: "page-type/song",
  slug: "vinny-marchi-hero-in-your-story",
  title: "Hero In Your Story",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
