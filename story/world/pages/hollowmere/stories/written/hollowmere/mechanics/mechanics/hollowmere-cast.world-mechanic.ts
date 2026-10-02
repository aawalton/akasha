import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const hollowmereCast = {
  id: "01a0fd0d-d975-75b0-b757-1bccb4c9b617",
  type: "page-type/world-mechanic",
  slug: "hollowmere-cast",
  title: "Cast",
  world: "world/hollowmere",
  description:
    "Nala is Alan, woken in a woman's body: about twenty, petite, pale and freckled, with long dark red hair, her face as her character's `coverDescription` says. The girls of Hollowmere are students, adults in their twenties, invented by the world builder, never personas: every one gorgeous, feminine and slim, never heavy, large-chested or older, each with her own home, family, magic, wants and troubles. Staff and townsfolk are adults of any age, and no man is ever a love interest. The world builder decides who each girl is, when she enters, and starts with the girls Nala meets on her first day. Each named character has a character-other at `story/world/pages/hollowmere/stories/written/hollowmere/characters/hollowmere-<name>.character-other.ts`, with `story: \"story-written/hollowmere\"` and `title` her name, and a lore page at `story/world/pages/hollowmere/lore/hollowmere-<name>.lore.ts` in `world/hollowmere` holding her look, her nature and her life as facts. Nala's own lore, `hollowmere-nala.lore.ts` there, holds what she remembers of being Alan, what her body is, and what she finds of the Nala whose life she woke into, and the world builder lands it before chapter 1. The world builder lands each other character's page and lore before the chapter she first appears in, with a portrait as her `cover`: render her alone, head to thigh, in the story design's visual style, as her lore's look describes her, as the picture recorder renders a turn but 832 wide and 1216 tall. The renderer draws women busty, so the prompt states her slim build and small chest, and the world builder renders again until it matches before setting `cover`. The memory story recorder tells each character each fact the prose shows her.",
} as const satisfies WorldMechanic
