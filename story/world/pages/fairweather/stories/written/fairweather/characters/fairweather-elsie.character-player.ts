import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const fairweatherElsie = {
  id: "01a10215-d2ad-7d12-8776-155b4e0428c6",
  type: "page-type/character-player",
  slug: "fairweather-elsie",
  title: "Elsie",
  cover: "image/image-e6523dfa77c4852c",
  coverDescription:
    "a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear",
  story: "story-written/fairweather",
  person: "person/alan",
} as const satisfies CharacterPlayer
